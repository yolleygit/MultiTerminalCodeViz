#!/usr/bin/env python3
"""
兔子GIF生成器
使用PIL (Pillow) 创建64x64像素的兔子动画GIF

安装依赖:
pip install Pillow

使用方法:
python create_bunny_gif.py
"""

from PIL import Image, ImageDraw
import os

def create_bunny_frame(frame_index, total_frames=4):
    """创建单帧兔子图像"""
    # 创建64x64的图像，天蓝色背景
    img = Image.new('RGB', (64, 64), color='#87CEEB')
    draw = ImageDraw.Draw(img)
    
    # 计算动画参数
    bounce = int(2 * abs(frame_index - total_frames/2) / (total_frames/2))
    ear_wiggle = 1 if frame_index % 2 == 0 else 0
    
    # 兔子身体 (白色)
    body_y = 35 - bounce
    draw.rectangle([20, body_y, 44, body_y + 20], fill='#FFFFFF')  # 身体
    draw.rectangle([24, body_y - 10, 40, body_y + 2], fill='#FFFFFF')  # 头部
    
    # 兔子耳朵 (白色外轮廓)
    ear_left_x = 25 + ear_wiggle
    ear_right_x = 34 - ear_wiggle
    ear_y = body_y - 21
    
    draw.rectangle([ear_left_x, ear_y, ear_left_x + 5, ear_y + 14], fill='#FFFFFF')  # 左耳
    draw.rectangle([ear_right_x, ear_y, ear_right_x + 5, ear_y + 14], fill='#FFFFFF')  # 右耳
    
    # 兔子耳朵内部 (粉色)
    draw.rectangle([ear_left_x + 1, ear_y + 2, ear_left_x + 4, ear_y + 12], fill='#FFB6C1')  # 左耳内部
    draw.rectangle([ear_right_x + 1, ear_y + 2, ear_right_x + 4, ear_y + 12], fill='#FFB6C1')  # 右耳内部
    
    # 眼睛 (黑色)
    eye_y = body_y - 7
    draw.rectangle([28, eye_y, 30, eye_y + 2], fill='#000000')  # 左眼
    draw.rectangle([34, eye_y, 36, eye_y + 2], fill='#000000')  # 右眼
    
    # 鼻子 (粉色)
    nose_y = body_y - 4
    draw.rectangle([31, nose_y, 33, nose_y + 1], fill='#FF69B4')
    
    # 嘴巴 (黑色小点)
    mouth_y = body_y - 2
    draw.point((30, mouth_y), fill='#000000')
    draw.point((33, mouth_y), fill='#000000')
    
    # 小尾巴 (白色)
    tail_x = 42 if frame_index % 2 == 0 else 43
    tail_y = body_y + 5
    draw.rectangle([tail_x, tail_y, tail_x + 3, tail_y + 3], fill='#FFFFFF')
    
    # 脚 (白色)
    foot_y = body_y + 18
    draw.rectangle([22, foot_y, 26, foot_y + 3], fill='#FFFFFF')  # 左脚
    draw.rectangle([38, foot_y, 42, foot_y + 3], fill='#FFFFFF')  # 右脚
    
    return img

def create_bunny_gif():
    """创建兔子动画GIF"""
    print("🐰 开始创建兔子GIF动画...")
    
    frames = []
    total_frames = 4
    
    # 创建所有帧
    for i in range(total_frames):
        print(f"创建第 {i+1}/{total_frames} 帧...")
        frame = create_bunny_frame(i, total_frames)
        frames.append(frame)
    
    # 保存为GIF
    output_path = 'public/bunny.gif'
    
    # 确保public目录存在
    os.makedirs('public', exist_ok=True)
    
    print(f"保存GIF到: {output_path}")
    frames[0].save(
        output_path,
        save_all=True,
        append_images=frames[1:],
        duration=200,  # 每帧200ms
        loop=0  # 无限循环
    )
    
    print("✅ 兔子GIF创建完成！")
    print(f"文件大小: {os.path.getsize(output_path)} 字节")
    
    return output_path

def create_preview_frames():
    """创建预览帧图像（用于调试）"""
    print("创建预览帧...")
    
    os.makedirs('preview_frames', exist_ok=True)
    
    for i in range(4):
        frame = create_bunny_frame(i)
        frame.save(f'preview_frames/bunny_frame_{i+1}.png')
        print(f"保存预览帧: preview_frames/bunny_frame_{i+1}.png")

def main():
    """主函数"""
    print("=" * 50)
    print("🐰 兔子GIF生成器")
    print("=" * 50)
    
    try:
        # 创建GIF
        gif_path = create_bunny_gif()
        
        # 创建预览帧（可选）
        create_preview_frames()
        
        print("\n" + "=" * 50)
        print("✅ 完成！")
        print(f"GIF文件: {gif_path}")
        print("预览帧: preview_frames/")
        print("\n使用说明:")
        print("1. 将生成的bunny.gif文件复制到项目的public目录")
        print("2. 启动项目: npm run dev")
        print("3. 在浏览器中查看弹跳兔子效果")
        print("=" * 50)
        
    except ImportError:
        print("❌ 错误: 未安装Pillow库")
        print("请运行: pip install Pillow")
    except Exception as e:
        print(f"❌ 创建GIF时出错: {e}")

if __name__ == "__main__":
    main()
