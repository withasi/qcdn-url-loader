# qcdn-url-loader

## 描述
结合[url-loader](https://www.npmjs.com/package/url-loader)和[qcdn](http://qnpm.qiwoo.org/package/@q/qcdn)的功能，相当于丰富url-loader的功能，最常见的场景：图片如果大于一定尺寸，则上传到公司的cdn上

qnpm中有功能一样的[qcdn-loader](http://qnpm.qiwoo.org/package/@q/qcdn-loader)，但是不支持qcdn参数设置

## 安装
`qnpm install --save-dev @q/qcdn-url-loader`


## 使用
在`webpack`的loader中使用，替换url-loader：
``` test: /\.(png|jpg|gif|svg)$/i,
        include: /img/,
        use: [
            {
                //loader: 'url-loader',
                loader: '@q/qcdn-url-loader',
                options: {
                    limit: 100,
                    qcdnOptions:{
                        https: true,
                        force: true
                    },
                    name: 'images/[name]-[hash:5].[ext]'
                }
            }
        ]
```
## 参数详解：
options中的参数和url-loader保持一致，qcdnOptions和[qcdn](http://qnpm.qiwoo.org/package/@q/qcdn)中的options保持一致
如果不传入qcdnOptions参数，则和url-loader功能一致


## 维护

有任何疑问请联系(siwangli@360.cn)
