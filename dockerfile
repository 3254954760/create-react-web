# 第一阶段
# 使用alpine镜像，可以减少构建后docker镜像文件的体积
FROM node:16-alpine

# 设置工作目录
WORKDIR /project

# 先copy package.json文件到工作目录，一般我们的项目中依赖是不会变的，这样可以充分利用缓存减少部署时的构建时间
COPY package*.json /project/

# 安装node_modules
RUN npm install

# 将所有文件copy到工作目录
COPY . /project

# 开始打包
RUN npm run build

# 第二阶段
# 拉取nginx镜像文件
FROM nginx
# 这里的dist文件就是打包好的文件，project是我们上面设置的工作目录
COPY --from=0 /project/dist /usr/share/nginx/dormitory
# default.conf就是我们项目下面的nginx配置文件，我们需要copy到nginx的相应目录
COPY --from=0 /project/default.conf /etc/nginx/conf.d/dormitory.conf