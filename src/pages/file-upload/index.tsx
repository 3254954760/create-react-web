import { useState } from 'react';
const UPLOAD_CHUNK_SIZE = 1024 * 10; // 10KB
const FileUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFile(file as File);
        const chunks = sliceFile(file as File, UPLOAD_CHUNK_SIZE);
        uploadFile(chunks as Blob[]);
    };
    const sliceFile = (file: File, size: number = UPLOAD_CHUNK_SIZE) => {
        const chunks = [];
        for (let i = 0; i < file.size; i += size) {
            chunks.push(file.slice(i, i + size));
        }
        return chunks;
    };
    const uploadFile = (chunks: Blob[]) => {
        const listFetch = chunks.map((chunk, index) => {
            const formData = new FormData();
            formData.append('file', chunk);
            formData.append('filename', file?.name || '');
            formData.append('index', index.toString());
            formData.append('total', chunks.length.toString());
            return fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
        });
        Promise.all(listFetch).then((res: any) => {
            fetch('/api/merge', {
                method: 'POST',
                body: JSON.stringify({
                    filename: file?.name,
                    total: chunks.length
                })
            }).then((res: any) => {
                console.log(res);
            });
        });
    };

    return (
        <>
            <div>FileUpload</div>
            <input type="file" onChange={handleFileChange} />
            <button>上传</button>
        </>
    );
};
export default FileUpload;
