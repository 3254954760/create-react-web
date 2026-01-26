import { useTranslation } from 'react-i18next';

/**
 * 简化的国际化 Hook
 * 返回一个对象，可以直接通过点号访问翻译，无需每次都写 t('xxx')
 * 
 * @example
 * const { t, i18n } = useI18n('main');
 * // 使用方式：
 * t.language.title  // 代替 t('language.title')
 * t.common.confirm  // 代替 t('common.confirm')
 */
export const useI18n = (namespace: string = 'main') => {
    const { t: originalT, i18n, ...rest } = useTranslation(namespace);

    // 创建一个代理对象，支持链式访问
    const createTProxy = (): any => {
        return new Proxy(
            {},
            {
                get: (_target, prop: string) => {
                    if (prop === 'toString' || prop === 'valueOf') {
                        return () => '';
                    }
                    // 如果直接调用 t()，使用原始函数
                    if (typeof prop === 'string' && prop.includes('(')) {
                        return originalT;
                    }
                    // 返回一个新的代理，继续链式访问
                    return createTProxy();
                },
                apply: (_target, _thisArg, args: any[]) => {
                    // 如果直接调用 t(key, options)，使用原始函数
                    if (args.length > 0 && typeof args[0] === 'string') {
                        return originalT(args[0], args[1]);
                    }
                    return originalT;
                }
            }
        );
    };

    // 创建一个更智能的翻译函数
    const t = ((key: string, options?: any) => {
        return originalT(key, options);
    }) as typeof originalT & {
        [key: string]: any;
    };

    // 使用 Proxy 实现链式访问
    const tProxy = new Proxy(t, {
        get: (_target, prop: string) => {
            // 如果是原始方法，直接返回
            if (prop === 'toString' || prop === 'valueOf' || prop === 'constructor') {
                return t[prop as keyof typeof t];
            }
            // 如果是链式访问，返回一个函数，可以继续链式调用或直接调用
            const path = prop;
            return new Proxy(
                (subKey?: string, options?: any) => {
                    if (subKey && typeof subKey === 'string') {
                        // 继续链式调用
                        return tProxy[subKey];
                    }
                    // 直接返回翻译
                    return originalT(path as string, options);
                },
                {
                    get: (_subTarget, subProp: string) => {
                        const fullPath = `${path}.${subProp}`;
                        return new Proxy(
                            (finalKey?: string, options?: any) => {
                                if (finalKey && typeof finalKey === 'string' && !finalKey.includes('.')) {
                                    return tProxy[finalKey];
                                }
                                return originalT(fullPath, options);
                            },
                            {
                                get: (_finalTarget, finalProp: string) => {
                                    return originalT(`${fullPath}.${finalProp}`, {});
                                }
                            }
                        );
                    },
                    apply: (_subTarget, _thisArg, args: any[]) => {
                        if (args.length === 0) {
                            return originalT(path as string);
                        }
                        return originalT(path as string, args[0]);
                    }
                }
            );
        },
        apply: (_target, _thisArg, args: any[]) => {
            // 保持原始 t() 函数的功能
            return originalT(args[0], args[1]);
        }
    });

    return {
        t: tProxy,
        i18n,
        ...rest
    };
};

