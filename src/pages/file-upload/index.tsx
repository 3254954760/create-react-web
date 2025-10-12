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
        const chunks = sliceFile(file as File, UPLOAD_CHUNK_SIZE);
        const listFetch = chunks.map((chunk, index) => {
            const formData = new FormData();
            formData.append('filename', file?.name || '');
            formData.append('index', index.toString());
            formData.append('total', chunks.length.toString());
            // 这一句一定要写在最后面，应为multer中间件会优先解析file，解析了file之后，formData.append('file', chunk);就解析不了了
            formData.append('file', chunk);
            return fetch('/api/upload-file', {
                method: 'POST',
                body: formData
            });
        });
        Promise.all(listFetch).then((res: any) => {
            setCanMerge(true);
        });
    }, [file]);

    const handleMerge = () => {
        console.log('合并文件');
        fetch('/api/merge-file', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filename: file?.name
            })
        }).then((res: any) => {
            console.log(res);
        });
    };

    return (
        <>
            <div>FileUpload</div>
            <Input type="file" onChange={handleFileChange} />
            <Button onClick={handleUploadFile}>上传</Button>
            {canMerge && <Button onClick={handleMerge}>合并文件</Button>}
        </>
    );
};
export default FileUpload;
