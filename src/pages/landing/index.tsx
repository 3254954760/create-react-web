import React, { useEffect } from 'react';
import { Data, useHooks } from './useHooks';
import { Empty } from 'antd';
const api = (params: any) =>
    new Promise((resolve, reject) => {
        resolve({
            items: [],
            total: 100,
            page: 1,
            pageSize: 10
        });
    }) as Promise<Data>;
export const Landing = () => {
    const { loading, error, getData, nextFetch, dataObject } = useHooks({ fetch: api });
    // 下拉刷新
    const handleScroll = (e: any) => {
        const scrollElement = e.currentTarget;
        if (scrollElement.scrollTop <= 10 && !loading) {
            return;
        }
        nextFetch({});
    };
    useEffect(() => {
        getData({
            page: 1,
            pageSize: 10
        });
    }, []);
    return (
        <div>
            {error && <Error />}

            {dataObject && dataObject.items.length === 0 ? (
                <Empty />
            ) : (
                <div id="scroll" onScroll={handleScroll}>
                    {dataObject?.items.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                </div>
            )}
            {loading && <Loading />}
        </div>
    );
};
