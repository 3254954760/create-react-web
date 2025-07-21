import React, { useState } from 'react';

export interface Data {
    items: number[];
    total: number;
    page: number;
    pageSize: number;
}
interface Props {
    fetch: (params: any) => Promise<Data>;
}

export const useHooks = ({ fetch }: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [dataObject, setDataObject] = useState<Data>({} as Data);

    const getData = async (params: any) => {
        setLoading(true);
        try {
            const res = await fetch(params);
            const { items, total, page, pageSize } = res;
            setDataObject({
                items: dataObject.items.concat(items),
                total,
                page,
                pageSize
            });
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const isNeedFetch = () => {
        if (loading) {
            return false;
        }
        let needFetch = false;
        const scrollItme = document.getElementById('scroll') || {
            scrollTop: 0,
            clientHeight: 0,
            scrollHeight: 0
        };
        if (scrollItme.scrollTop + scrollItme.clientHeight > scrollItme.scrollHeight - 150) {
            needFetch = true;
        }
        return needFetch;
    };

    const nextFetch = async (params: any) => {
        if (!isNeedFetch()) {
            return;
        }
        await getData(params);
    };

    return {
        loading,
        error,
        getData,
        nextFetch,
        dataObject
    };
};
