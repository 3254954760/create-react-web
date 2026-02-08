import React, { useEffect, useState, Key } from 'react';
import { Button, Tree, TreeDataNode, TreeProps } from 'antd';
import { RightOutlined, SettingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { githubTest } from '@/service/Login';
import jsCookie from 'js-cookie';
import axios from '@service/Axios';

const Home = () => {
    const history = useHistory();
    const [state, setState] = useState(0);
    const goLogin = () => {
        history.push('/login');
    };
    useEffect(() => {
        console.log('创建', state);
        return () => {
            console.log('销毁', state);
        };
    }, [state]);

    // 初始树数据
    const initialTreeData: TreeDataNode[] = [
        {
            title: '系统管理',
            icon: <SettingOutlined />,
            key: 'system',
            children: [
                {
                    title: '用户管理',
                    key: 'system-user',
                    children: [
                        {
                            title: '用户列表',
                            key: 'system-user-list'
                        },
                        {
                            title: '用户权限',
                            key: 'system-user-permission'
                        }
                    ]
                },
                {
                    title: '角色管理',
                    key: 'system-role',
                    children: [
                        {
                            title: '角色列表',
                            key: 'system-role-list'
                        },
                        {
                            title: '角色配置',
                            key: 'system-role-config'
                        }
                    ]
                }
            ]
        },
        {
            title: '内容管理',
            key: 'content',
            children: [
                {
                    title: '文章管理',
                    key: 'content-article',
                    children: [
                        {
                            title: '文章列表',
                            key: 'content-article-list'
                        },
                        {
                            title: '文章分类',
                            key: 'content-article-category'
                        }
                    ]
                },
                {
                    title: '评论管理',
                    key: 'content-comment',
                    children: [
                        {
                            title: '评论审核',
                            key: 'content-comment-audit'
                        },
                        {
                            title: '评论列表',
                            key: 'content-comment-list'
                        }
                    ]
                }
            ]
        },
        {
            title: '系统设置',
            key: 'settings',
            children: [
                {
                    title: '系统配置',
                    key: 'settings-system',
                    children: [
                        {
                            title: '基础设置',
                            key: 'settings-system-basic'
                        },
                        {
                            title: '高级设置',
                            key: 'settings-system-advanced'
                        }
                    ]
                },
                {
                    title: '个人设置',
                    key: 'settings-personal',
                    children: [
                        {
                            title: '账号设置',
                            key: 'settings-personal-account'
                        },
                        {
                            title: '隐私设置',
                            key: 'settings-personal-privacy'
                        }
                    ]
                }
            ]
        }
    ];

    // 将 treeData 改为 state，支持拖拽排序后更新
    const [treeData, setTreeData] = useState<TreeDataNode[]>(initialTreeData);

    // 工具函数：深拷贝树节点
    const cloneData = (data: TreeDataNode[]): TreeDataNode[] => {
        return data.map(item => ({
            ...item,
            children: item.children ? cloneData(item.children) : undefined
        }));
    };

    // 工具函数：从树中查找节点路径（用于定位和删除）
    const findNodePath = (data: TreeDataNode[], key: Key, path: TreeDataNode[] = []): TreeDataNode[] | null => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const currentPath = [...path, node];

            if (node.key === key) {
                return currentPath;
            }

            if (node.children) {
                const result = findNodePath(node.children, key, currentPath);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    };

    // 工具函数：从树中删除节点
    const removeNode = (data: TreeDataNode[], key: Key): TreeDataNode[] => {
        return data
            .filter(node => node.key !== key)
            .map(node => ({
                ...node,
                children: node.children ? removeNode(node.children, key) : undefined
            }));
    };

    // 拖拽排序处理
    const onDrop: TreeProps['onDrop'] = info => {
        const { dragNode, node, dropToGap, dropPosition } = info;
        const dropKey = node.key;
        const dragKey = dragNode.key;

        // 防止将节点拖到自己内部（会导致无限循环）
        const dragNodePath = findNodePath(treeData, dragKey);
        if (dragNodePath && dragNodePath.some(n => n.key === dropKey)) {
            return;
        }

        // 深拷贝数据，避免直接修改原数据
        const newTreeData = cloneData(treeData);

        // 1. 先从原位置删除被拖拽的节点
        const dataWithoutDrag = removeNode(newTreeData, dragKey);

        // 2. 查找目标节点的位置
        const findAndInsertNode = (
            data: TreeDataNode[],
            targetKey: Key,
            newNode: TreeDataNode,
            isDropToGap: boolean,
            dropPos: number
        ): TreeDataNode[] => {
            for (let i = 0; i < data.length; i++) {
                const currentNode = data[i];

                // 找到目标节点
                if (currentNode.key === targetKey) {
                    if (isDropToGap) {
                        // 放置到节点间隙（作为同级节点）
                        if (dropPos === -1) {
                            // 插入到目标节点前面
                            const newData = [...data];
                            newData.splice(i, 0, newNode);
                            return newData;
                        } else {
                            // 插入到目标节点后面
                            const newData = [...data];
                            newData.splice(i + 1, 0, newNode);
                            return newData;
                        }
                    } else {
                        // 放置到目标节点内部（作为子节点）
                        const newData = [...data];
                        const updatedNode = {
                            ...currentNode,
                            children: currentNode.children ? [...currentNode.children, newNode] : [newNode]
                        };
                        newData[i] = updatedNode;
                        return newData;
                    }
                }

                // 递归查找子节点
                if (currentNode.children) {
                    const updatedChildren = findAndInsertNode(
                        currentNode.children,
                        targetKey,
                        newNode,
                        isDropToGap,
                        dropPos
                    );
                    if (updatedChildren !== currentNode.children) {
                        const newData = [...data];
                        newData[i] = { ...currentNode, children: updatedChildren };
                        return newData;
                    }
                }
            }
            return data;
        };

        // 3. 从原始数据中获取完整的拖拽节点（包含 children）
        const getNodeByKey = (data: TreeDataNode[], key: Key): TreeDataNode | null => {
            for (const node of data) {
                if (node.key === key) {
                    return node;
                }
                if (node.children) {
                    const found = getNodeByKey(node.children, key);
                    if (found) return found;
                }
            }
            return null;
        };

        const originalDragNode = getNodeByKey(treeData, dragKey);
        if (!originalDragNode) {
            return;
        }

        // 4. 深拷贝被拖拽节点（保留完整结构，避免引用问题）
        const clonedDragNode = cloneData([originalDragNode])[0];

        // 5. 插入到新位置
        const finalData = findAndInsertNode(
            dataWithoutDrag,
            dropKey,
            clonedDragNode,
            dropToGap,
            dropPosition as number
        );

        // 6. 更新 state
        setTreeData(finalData);
    };

    const onSelect: TreeProps['onSelect'] = (selectedKeys: Key[], info: any) => {
        console.log('selected', selectedKeys, info);
    };

    const onExpand: TreeProps['onExpand'] = (expandedKeys: Key[], info: any) => {
        console.log('expanded', expandedKeys, info);
    };
    const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };
    const onDragStart: TreeProps['onDragStart'] = (info: any) => {
        console.log('onDragStart', info);
    };
    // const onDragEnter: TreeProps['onDragEnter'] = (info: any) => {
    //     console.log('onDragEnter', info);
    // };

    const onDragOver: TreeProps['onDragOver'] = (info: any) => {
        console.log('onDragOver', info);
    };
    const onDragLeave: TreeProps['onDragLeave'] = (info: any) => {
        console.log('onDragLeave', info);
    };
    const getAddData = () => {
        fetch('/api/add')
            .then(res => res.json())
            .then(data => {
                console.log('data', data);
            });
    };

    useEffect(() => {
        const token = jsCookie.get('token');
        console.log('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }, []);

    const getUserInfo = async () => {
        const res = await githubTest();
        console.log('res', res);
    };
    return (
        <>
            <div>home</div>

            <div onClick={() => setState(state + 1)}>销毁重建</div>
            <button onClick={goLogin}>去登录</button>
            <button onClick={() => getUserInfo()}>获取用户信息</button>
            <Button onClick={() => getAddData()}>++++++</Button>
            <Tree
                treeData={treeData}
                defaultExpandedKeys={['system-user', 'content-comment']}
                defaultSelectedKeys={['content-comment-list']}
                checkable
                draggable
                onSelect={onSelect}
                onCheck={onCheck}
                onDrop={onDrop}
                onDragStart={onDragStart}
            />
        </>
    );
};

export default Home;
