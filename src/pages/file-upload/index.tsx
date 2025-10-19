import { Button, Input } from 'antd';
import { useCallback, useState } from 'react';
const UPLOAD_CHUNK_SIZE = 1024 * 10; // 10KB
const FileUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [canMerge, setCanMerge] = useState(false);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFile(file as File);
    };
    const sliceFile = (file: File, size: number = UPLOAD_CHUNK_SIZE) => {
        const chunks = [];
        for (let i = 0; i < file.size; i += size) {
            chunks.push(file.slice(i, i + size));
        }
        return chunks;
    };
    const handleUploadFile = useCallback(() => {
        if (!file) return;

        const chunks = sliceFile(file, UPLOAD_CHUNK_SIZE);
        const listFetch = chunks.map((chunk, index) => {
            const formData = new FormData();
            formData.append('filename', file.name);
            formData.append('index', index.toString());
            formData.append('total', chunks.length.toString());
            // 这一句一定要写在最后面，应为multer中间件会优先解析file，解析了file之后，formData.append('file', chunk);就解析不了了
            formData.append('file', chunk);
            return fetch('/api/upload-file', {
                method: 'POST',
                body: formData
            });
        });
        Promise.all(listFetch)
            .then((res: any) => {
                console.log('所有分片上传完成');
                setCanMerge(true);
            })
            .catch(error => {
                console.error('上传失败:', error);
            });
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

    return (
        <>
            <div>FileUpload</div>
            <input type="file" onChange={handleFileChange} />
            <Button onClick={handleUploadFile} disabled={!file}>
                上传分片
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
                    <p>分片数量: {Math.ceil(file.size / UPLOAD_CHUNK_SIZE)}</p>
                    {canMerge && <p style={{ color: 'green' }}>✅ 分片上传完成，可以合并文件</p>}
                </div>
            )}
        </>
    );
};
export default FileUpload;
