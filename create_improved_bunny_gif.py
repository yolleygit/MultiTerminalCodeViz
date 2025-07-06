#!/usr/bin/env python3
"""
改进的兔子GIF生成器
创建更精美的64x64像素兔子动画，具有更好的视觉效果和流畅的动画

特性:
- 更精致的兔子设计
- 改进的比例和轮廓
- 流畅的动画过渡
- 优化的像素艺术风格
- 小文件大小 (<5KB)
"""

from PIL import Image, ImageDraw
import os

def create_improved_bunny_frame(frame_index, total_frames=6):
    """创建改进的兔子动画帧"""
    # 创建64x64的图像，透明背景
    img = Image.new('RGBA', (64, 64), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # 动画参数
    bounce_cycle = frame_index / total_frames * 2 * 3.14159  # 完整的弹跳周期
    bounce_offset = int(3 * abs(math.sin(bounce_cycle)))  # 弹跳高度 0-3像素
    ear_wiggle = 1 if frame_index % 3 == 0 else 0  # 耳朵摆动
    tail_wiggle = 1 if (frame_index + 1) % 2 == 0 else 0  # 尾巴摆动
    
    # 基础位置
    base_y = 32 - bounce_offset
    
    # 兔子身体 (更圆润的形状)
    body_color = '#F5F5F5'  # 柔和的白色
    
    # 主体身体 (椭圆形)
    draw.ellipse([22, base_y + 8, 42, base_y + 28], fill=body_color)
    
    # 头部 (圆形)
    draw.ellipse([26, base_y - 2, 38, base_y + 10], fill=body_color)
    
    # 兔子耳朵 (更长更优雅)
    ear_color = '#F0F0F0'
    ear_inner_color = '#FFB6C1'  # 粉色内部
    
    # 左耳
    left_ear_x = 28 + ear_wiggle
    ear_points_left = [
        (left_ear_x, base_y - 12),      # 耳尖
        (left_ear_x + 2, base_y - 15),  # 外侧
        (left_ear_x + 4, base_y - 12),  # 内侧
        (left_ear_x + 3, base_y - 2)    # 底部
    ]
    draw.polygon(ear_points_left, fill=ear_color)
    
    # 右耳
    right_ear_x = 34 - ear_wiggle
    ear_points_right = [
        (right_ear_x, base_y - 12),      # 耳尖
        (right_ear_x - 2, base_y - 15),  # 外侧
        (right_ear_x - 4, base_y - 12),  # 内侧
        (right_ear_x - 3, base_y - 2)    # 底部
    ]
    draw.polygon(ear_points_right, fill=ear_color)
    
    # 耳朵内部 (粉色)
    draw.ellipse([left_ear_x + 1, base_y - 10, left_ear_x + 3, base_y - 4], fill=ear_inner_color)
    draw.ellipse([right_ear_x - 3, base_y - 10, right_ear_x - 1, base_y - 4], fill=ear_inner_color)
    
    # 眼睛 (更大更可爱)
    eye_color = '#2C2C2C'
    highlight_color = '#FFFFFF'
    
    # 左眼
    draw.ellipse([29, base_y + 2, 32, base_y + 5], fill=eye_color)
    draw.ellipse([30, base_y + 2, 31, base_y + 3], fill=highlight_color)  # 高光
    
    # 右眼
    draw.ellipse([32, base_y + 2, 35, base_y + 5], fill=eye_color)
    draw.ellipse([33, base_y + 2, 34, base_y + 3], fill=highlight_color)  # 高光
    
    # 鼻子 (心形)
    nose_color = '#FF69B4'
    nose_points = [
        (32, base_y + 6),      # 底部
        (31, base_y + 5),      # 左侧
        (30, base_y + 5),      # 左上
        (31, base_y + 4),      # 左心形
        (32, base_y + 5),      # 中心
        (33, base_y + 4),      # 右心形
        (34, base_y + 5),      # 右上
        (33, base_y + 5)       # 右侧
    ]
    draw.polygon(nose_points, fill=nose_color)
    
    # 嘴巴 (微笑)
    mouth_color = '#8B4513'
    draw.arc([30, base_y + 6, 34, base_y + 9], start=0, end=180, fill=mouth_color, width=1)
    
    # 胡须
    whisker_color = '#696969'
    # 左胡须
    draw.line([(25, base_y + 6), (28, base_y + 6)], fill=whisker_color, width=1)
    draw.line([(25, base_y + 7), (28, base_y + 7)], fill=whisker_color, width=1)
    # 右胡须
    draw.line([(36, base_y + 6), (39, base_y + 6)], fill=whisker_color, width=1)
    draw.line([(36, base_y + 7), (39, base_y + 7)], fill=whisker_color, width=1)
    
    # 前爪
    paw_color = '#E8E8E8'
    draw.ellipse([28, base_y + 18, 31, base_y + 21], fill=paw_color)
    draw.ellipse([33, base_y + 18, 36, base_y + 21], fill=paw_color)
    
    # 后腿
    draw.ellipse([24, base_y + 22, 28, base_y + 26], fill=body_color)
    draw.ellipse([36, base_y + 22, 40, base_y + 26], fill=body_color)
    
    # 后爪
    draw.ellipse([24, base_y + 24, 27, base_y + 27], fill=paw_color)
    draw.ellipse([37, base_y + 24, 40, base_y + 27], fill=paw_color)
    
    # 尾巴 (蓬松的圆形)
    tail_x = 42 + tail_wiggle
    tail_y = base_y + 15
    draw.ellipse([tail_x, tail_y, tail_x + 4, tail_y + 4], fill=body_color)
    
    # 添加阴影效果
    shadow_color = '#D3D3D3'
    draw.ellipse([23, base_y + 26, 41, base_y + 29], fill=shadow_color)  # 身体阴影
    
    return img

def create_improved_bunny_gif():
    """创建改进的兔子动画GIF"""
    print("🐰 开始创建改进的兔子GIF动画...")
    
    # 导入math模块
    import math
    
    frames = []
    total_frames = 6  # 增加帧数以获得更流畅的动画
    
    # 创建所有帧
    for i in range(total_frames):
        print(f"创建第 {i+1}/{total_frames} 帧...")
        
        # 修复函数调用，传递math模块
        frame = create_improved_bunny_frame_with_math(i, total_frames)
        frames.append(frame)
    
    # 保存为GIF
    output_path = 'public/bunny.gif'
    
    # 确保public目录存在
    os.makedirs('public', exist_ok=True)
    
    print(f"保存改进的GIF到: {output_path}")
    frames[0].save(
        output_path,
        save_all=True,
        append_images=frames[1:],
        duration=150,  # 每帧150ms，更流畅
        loop=0,  # 无限循环
        optimize=True,  # 优化文件大小
        transparency=0  # 透明背景
    )
    
    file_size = os.path.getsize(output_path)
    print(f"✅ 改进的兔子GIF创建完成！")
    print(f"文件大小: {file_size} 字节 ({file_size/1024:.1f} KB)")
    
    if file_size > 5120:  # 5KB
        print("⚠️  文件大小超过5KB，建议进一步优化")
    else:
        print("✅ 文件大小符合要求 (<5KB)")
    
    return output_path

def create_improved_bunny_frame_with_math(frame_index, total_frames=6):
    """创建改进的兔子动画帧 - 包含math模块"""
    import math
    
    # 创建64x64的图像，透明背景
    img = Image.new('RGBA', (64, 64), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # 动画参数
    bounce_cycle = frame_index / total_frames * 2 * math.pi  # 完整的弹跳周期
    bounce_offset = int(3 * abs(math.sin(bounce_cycle)))  # 弹跳高度 0-3像素
    ear_wiggle = 1 if frame_index % 3 == 0 else 0  # 耳朵摆动
    tail_wiggle = 1 if (frame_index + 1) % 2 == 0 else 0  # 尾巴摆动
    
    # 基础位置
    base_y = 32 - bounce_offset
    
    # 兔子身体 (更圆润的形状)
    body_color = '#F5F5F5'  # 柔和的白色
    
    # 主体身体 (椭圆形)
    draw.ellipse([22, base_y + 8, 42, base_y + 28], fill=body_color)
    
    # 头部 (圆形)
    draw.ellipse([26, base_y - 2, 38, base_y + 10], fill=body_color)
    
    # 兔子耳朵 (更长更优雅)
    ear_color = '#F0F0F0'
    ear_inner_color = '#FFB6C1'  # 粉色内部
    
    # 左耳
    left_ear_x = 28 + ear_wiggle
    ear_points_left = [
        (left_ear_x, base_y - 12),      # 耳尖
        (left_ear_x + 2, base_y - 15),  # 外侧
        (left_ear_x + 4, base_y - 12),  # 内侧
        (left_ear_x + 3, base_y - 2)    # 底部
    ]
    draw.polygon(ear_points_left, fill=ear_color)
    
    # 右耳
    right_ear_x = 34 - ear_wiggle
    ear_points_right = [
        (right_ear_x, base_y - 12),      # 耳尖
        (right_ear_x - 2, base_y - 15),  # 外侧
        (right_ear_x - 4, base_y - 12),  # 内侧
        (right_ear_x - 3, base_y - 2)    # 底部
    ]
    draw.polygon(ear_points_right, fill=ear_color)
    
    # 耳朵内部 (粉色)
    draw.ellipse([left_ear_x + 1, base_y - 10, left_ear_x + 3, base_y - 4], fill=ear_inner_color)
    draw.ellipse([right_ear_x - 3, base_y - 10, right_ear_x - 1, base_y - 4], fill=ear_inner_color)
    
    # 眼睛 (更大更可爱)
    eye_color = '#2C2C2C'
    highlight_color = '#FFFFFF'
    
    # 左眼
    draw.ellipse([29, base_y + 2, 32, base_y + 5], fill=eye_color)
    draw.ellipse([30, base_y + 2, 31, base_y + 3], fill=highlight_color)  # 高光
    
    # 右眼
    draw.ellipse([32, base_y + 2, 35, base_y + 5], fill=eye_color)
    draw.ellipse([33, base_y + 2, 34, base_y + 3], fill=highlight_color)  # 高光
    
    # 鼻子 (心形)
    nose_color = '#FF69B4'
    draw.ellipse([31, base_y + 5, 33, base_y + 7], fill=nose_color)
    
    # 嘴巴 (简化的微笑)
    mouth_color = '#8B4513'
    draw.point((30, base_y + 8), fill=mouth_color)
    draw.point((34, base_y + 8), fill=mouth_color)
    
    # 胡须
    whisker_color = '#696969'
    # 左胡须
    draw.line([(25, base_y + 6), (28, base_y + 6)], fill=whisker_color, width=1)
    draw.line([(25, base_y + 7), (28, base_y + 7)], fill=whisker_color, width=1)
    # 右胡须
    draw.line([(36, base_y + 6), (39, base_y + 6)], fill=whisker_color, width=1)
    draw.line([(36, base_y + 7), (39, base_y + 7)], fill=whisker_color, width=1)
    
    # 前爪
    paw_color = '#E8E8E8'
    draw.ellipse([28, base_y + 18, 31, base_y + 21], fill=paw_color)
    draw.ellipse([33, base_y + 18, 36, base_y + 21], fill=paw_color)
    
    # 后腿
    draw.ellipse([24, base_y + 22, 28, base_y + 26], fill=body_color)
    draw.ellipse([36, base_y + 22, 40, base_y + 26], fill=body_color)
    
    # 后爪
    draw.ellipse([24, base_y + 24, 27, base_y + 27], fill=paw_color)
    draw.ellipse([37, base_y + 24, 40, base_y + 27], fill=paw_color)
    
    # 尾巴 (蓬松的圆形)
    tail_x = 42 + tail_wiggle
    tail_y = base_y + 15
    draw.ellipse([tail_x, tail_y, tail_x + 4, tail_y + 4], fill=body_color)
    
    # 添加阴影效果
    shadow_color = '#D3D3D3'
    draw.ellipse([23, base_y + 26, 41, base_y + 29], fill=shadow_color)  # 身体阴影
    
    return img

def create_preview_frames_improved():
    """创建改进的预览帧图像"""
    print("创建改进的预览帧...")
    
    os.makedirs('preview_frames_improved', exist_ok=True)
    
    for i in range(6):
        frame = create_improved_bunny_frame_with_math(i, 6)
        frame.save(f'preview_frames_improved/improved_bunny_frame_{i+1}.png')
        print(f"保存改进的预览帧: preview_frames_improved/improved_bunny_frame_{i+1}.png")

def main():
    """主函数"""
    print("=" * 60)
    print("🐰 改进的兔子GIF生成器")
    print("=" * 60)
    
    try:
        # 创建改进的GIF
        gif_path = create_improved_bunny_gif()
        
        # 创建预览帧
        create_preview_frames_improved()
        
        print("\n" + "=" * 60)
        print("✅ 改进的兔子GIF创建完成！")
        print(f"GIF文件: {gif_path}")
        print("预览帧: preview_frames_improved/")
        print("\n改进特性:")
        print("- 更精致的兔子设计和比例")
        print("- 6帧动画，更流畅的过渡效果")
        print("- 优化的像素艺术风格")
        print("- 透明背景，更好的集成效果")
        print("- 文件大小优化 (<5KB)")
        print("- 更可爱的表情和细节")
        print("\n使用说明:")
        print("1. 新的bunny.gif已保存到public目录")
        print("2. 启动项目: npm run dev")
        print("3. 在浏览器中查看改进的弹跳兔子效果")
        print("=" * 60)
        
    except Exception as e:
        print(f"❌ 创建改进的GIF时出错: {e}")

if __name__ == "__main__":
    main()
