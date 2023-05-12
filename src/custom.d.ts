declare module "*.css" {  // 只要import以css为后缀的文件，都遵循以下约定
    const css: { [key: string] : string };  // 导出key所在的对象，而原始的类名以及相应的值都将被转换为这个对象
    export default css;
}