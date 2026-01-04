import { Button } from 'antd';
import { useCallback, useState } from 'react';
const UPLOAD_CHUNK_SIZE = 1024 * 10; // 10KB
const MAX_CONCURRENT_UPLOADS = 3; // 最大并发上传数

// 并发控制函数：限制同时执行的任务数量
const limitConcurrency = async <T,>(tasks: (() => Promise<T>)[], limit: number): Promise<T[]> => {
    const results: (T | null)[] = new Array(tasks.length).fill(null);
    const executing: Promise<void>[] = [];

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const index = i;

        const promise = task().then(result => {
            results[index] = result;
            executing.splice(executing.indexOf(promise), 1);
        });

        executing.push(promise as Promise<void>);

        if (executing.length >= limit) {
            await Promise.race(executing);
        }
    }

    await Promise.all(executing);
    return results as T[];
};

const FileUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [canMerge, setCanMerge] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFile(file as File);
        setCanMerge(false);
        setUploadProgress(0);
    };
    const sliceFile = (file: File, size: number = UPLOAD_CHUNK_SIZE) => {
        const chunks = [];
        for (let i = 0; i < file.size; i += size) {
            chunks.push(file.slice(i, i + size));
        }
        return chunks;
    };
    const handleUploadFile = useCallback(async () => {
        if (!file) return;

        setUploading(true);
        setUploadProgress(0);
        setCanMerge(false);

        const chunks = sliceFile(file, UPLOAD_CHUNK_SIZE);
        const totalChunks = chunks.length;

        // 创建上传任务数组
        const uploadTasks = chunks.map((chunk, index) => {
            return async () => {
                const formData = new FormData();
                formData.append('filename', file.name);
                formData.append('index', index.toString());
                formData.append('total', totalChunks.toString());
                // 这一句一定要写在最后面，应为multer中间件会优先解析file，解析了file之后，formData.append('file', chunk);就解析不了了
                formData.append('file', chunk);

                const response = await fetch('/api/upload-file', {
                    method: 'POST',
                    body: formData
                });

                // 更新进度
                setUploadProgress(prev => prev + 1);

                return response;
            };
        });

        try {
            await limitConcurrency(uploadTasks, MAX_CONCURRENT_UPLOADS);
            console.log('所有分片上传完成');
            setCanMerge(true);
        } catch (error) {
            console.error('上传失败:', error);
        } finally {
            setUploading(false);
        }
    }, [file]);

    const handleMerge = () => {
        if (!file) return;

        const chunks = sliceFile(file, UPLOAD_CHUNK_SIZE);
        console.log('合并文件');
        fetch('/api/merge-file', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filename: file.name,
                total: chunks.length
            })
        })
            .then((res: any) => {
                console.log('文件合并完成:', res);
                setCanMerge(false); // 重置状态
            })
            .catch(error => {
                console.error('合并失败:', error);
            });
    };

    const totalChunks = file ? Math.ceil(file.size / UPLOAD_CHUNK_SIZE) : 0;
    const progressPercent = totalChunks > 0 ? Math.round((uploadProgress / totalChunks) * 100) : 0;

    return (
        <>
            <div>FileUpload</div>
            <input type="file" onChange={handleFileChange} disabled={uploading} />
            <Button onClick={handleUploadFile} disabled={!file || uploading} loading={uploading}>
                {uploading ? `上传中... (${uploadProgress}/${totalChunks})` : '上传分片'}
            </Button>
            {canMerge && (
                <Button onClick={handleMerge} type="primary">
                    合并文件
                </Button>
            )}
            {file && (
                <div style={{ marginTop: '16px' }}>
                    <p>文件名: {file.name}</p>
                    <p>文件大小: {(file.size / 1024).toFixed(2)} KB</p>
                    <p>分片数量: {totalChunks}</p>
                    <p>最大并发数: {MAX_CONCURRENT_UPLOADS}</p>
                    {uploading && (
                        <div style={{ marginTop: '8px' }}>
                            <p>
                                上传进度: {uploadProgress} / {totalChunks} ({progressPercent}%)
                            </p>
                            <div
                                style={{
                                    width: '100%',
                                    height: '8px',
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: '4px',
                                    overflow: 'hidden'
                                }}
                            >
                                <div
                                    style={{
                                        width: `${progressPercent}%`,
                                        height: '100%',
                                        backgroundColor: '#1890ff',
                                        transition: 'width 0.3s ease'
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    {canMerge && <p style={{ color: 'green' }}>✅ 分片上传完成，可以合并文件</p>}
                </div>
            )}
        </>
    );
};
export default FileUpload;
