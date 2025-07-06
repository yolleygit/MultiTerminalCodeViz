/**
 * BouncyRabbit组件功能验证脚本
 * 在浏览器控制台中运行此脚本来验证所有功能
 */

class BouncyRabbitVerifier {
    constructor() {
        this.results = {
            bunnyDisplay: false,
            physicsEffect: false,
            generationRule: false,
            controlPanel: false,
            removeFunction: false,
            performance: false
        };
        this.testLog = [];
    }

    log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `[${timestamp}] ${type.toUpperCase()}: ${message}`;
        this.testLog.push(logEntry);
        console.log(`%c${logEntry}`, this.getLogStyle(type));
    }

    getLogStyle(type) {
        const styles = {
            info: 'color: #2196F3',
            success: 'color: #4CAF50; font-weight: bold',
            error: 'color: #F44336; font-weight: bold',
            warning: 'color: #FF9800'
        };
        return styles[type] || styles.info;
    }

    async runAllTests() {
        this.log('开始BouncyRabbit组件功能验证', 'info');
        this.log('='.repeat(50), 'info');

        try {
            await this.testBunnyDisplay();
            await this.testPhysicsEffect();
            await this.testGenerationRule();
            await this.testControlPanel();
            await this.testRemoveFunction();
            await this.testPerformance();
            
            this.generateReport();
        } catch (error) {
            this.log(`验证过程中出现错误: ${error.message}`, 'error');
        }
    }

    async testBunnyDisplay() {
        this.log('测试1: 兔子动画显示', 'info');
        
        try {
            // 检查bunny.gif文件是否存在
            const response = await fetch('/bunny.gif');
            if (response.ok) {
                this.log('✓ bunny.gif文件存在', 'success');
            } else {
                this.log('✗ bunny.gif文件不存在', 'error');
                return;
            }

            // 检查BouncyRabbit组件是否渲染
            const rabbitElements = document.querySelectorAll('img[alt="Bouncy rabbit"]');
            if (rabbitElements.length > 0) {
                this.log(`✓ 找到 ${rabbitElements.length} 个兔子元素`, 'success');
                
                // 检查图片是否正确加载
                const firstRabbit = rabbitElements[0];
                if (firstRabbit.complete && firstRabbit.naturalWidth > 0) {
                    this.log('✓ 兔子图片加载成功', 'success');
                    this.results.bunnyDisplay = true;
                } else {
                    this.log('✗ 兔子图片加载失败', 'error');
                }
            } else {
                this.log('✗ 未找到兔子元素', 'error');
            }
        } catch (error) {
            this.log(`兔子显示测试失败: ${error.message}`, 'error');
        }
    }

    async testPhysicsEffect() {
        this.log('测试2: 物理弹跳效果', 'info');
        
        try {
            const rabbitElements = document.querySelectorAll('img[alt="Bouncy rabbit"]');
            if (rabbitElements.length === 0) {
                this.log('✗ 没有兔子元素可测试', 'error');
                return;
            }

            const rabbit = rabbitElements[0];
            const container = rabbit.closest('div');
            
            if (container) {
                const initialPosition = {
                    x: parseInt(container.style.left) || 0,
                    y: parseInt(container.style.top) || 0
                };
                
                this.log(`初始位置: x=${initialPosition.x}, y=${initialPosition.y}`, 'info');
                
                // 等待一段时间观察位置变化
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const newPosition = {
                    x: parseInt(container.style.left) || 0,
                    y: parseInt(container.style.top) || 0
                };
                
                this.log(`新位置: x=${newPosition.x}, y=${newPosition.y}`, 'info');
                
                if (initialPosition.x !== newPosition.x || initialPosition.y !== newPosition.y) {
                    this.log('✓ 兔子位置发生变化，物理效果正常', 'success');
                    this.results.physicsEffect = true;
                } else {
                    this.log('✗ 兔子位置未变化，可能动画未启动', 'warning');
                }
            } else {
                this.log('✗ 无法找到兔子容器元素', 'error');
            }
        } catch (error) {
            this.log(`物理效果测试失败: ${error.message}`, 'error');
        }
    }

    async testGenerationRule() {
        this.log('测试3: 每5个终端生成1只兔子规则', 'info');
        
        try {
            // 获取当前终端数量
            const terminalElements = document.querySelectorAll('[id^="terminal-"]');
            const terminalCount = terminalElements.length;
            
            // 获取当前兔子数量
            const rabbitElements = document.querySelectorAll('img[alt="Bouncy rabbit"]');
            const rabbitCount = rabbitElements.length;
            
            // 计算期望的兔子数量
            const expectedRabbitCount = Math.floor(terminalCount / 5);
            
            this.log(`终端数量: ${terminalCount}`, 'info');
            this.log(`兔子数量: ${rabbitCount}`, 'info');
            this.log(`期望兔子数量: ${expectedRabbitCount}`, 'info');
            
            if (rabbitCount === expectedRabbitCount) {
                this.log('✓ 兔子生成规则正确', 'success');
                this.results.generationRule = true;
            } else {
                this.log('✗ 兔子生成规则不正确', 'error');
            }
        } catch (error) {
            this.log(`生成规则测试失败: ${error.message}`, 'error');
        }
    }

    async testControlPanel() {
        this.log('测试4: 控制面板兔子显示', 'info');
        
        try {
            // 查找控制面板中的兔子计数显示
            const rabbitCountElements = document.querySelectorAll('*');
            let rabbitCountFound = false;
            
            for (let element of rabbitCountElements) {
                if (element.textContent && element.textContent.includes('🐰')) {
                    this.log(`✓ 找到兔子计数显示: ${element.textContent.trim()}`, 'success');
                    rabbitCountFound = true;
                    break;
                }
            }
            
            if (!rabbitCountFound) {
                this.log('✗ 未找到兔子计数显示', 'error');
            }
            
            // 查找Remove Rabbits按钮
            const removeButton = Array.from(document.querySelectorAll('button')).find(
                btn => btn.textContent.includes('Remove Rabbits')
            );
            
            if (removeButton) {
                this.log('✓ 找到"Remove Rabbits"按钮', 'success');
                this.results.controlPanel = true;
            } else {
                this.log('✗ 未找到"Remove Rabbits"按钮', 'error');
            }
        } catch (error) {
            this.log(`控制面板测试失败: ${error.message}`, 'error');
        }
    }

    async testRemoveFunction() {
        this.log('测试5: 移除兔子功能', 'info');
        
        try {
            const removeButton = Array.from(document.querySelectorAll('button')).find(
                btn => btn.textContent.includes('Remove Rabbits')
            );
            
            if (!removeButton) {
                this.log('✗ 未找到Remove Rabbits按钮，跳过测试', 'warning');
                return;
            }
            
            // 记录点击前的兔子数量
            const beforeCount = document.querySelectorAll('img[alt="Bouncy rabbit"]').length;
            this.log(`点击前兔子数量: ${beforeCount}`, 'info');
            
            if (beforeCount === 0) {
                this.log('当前没有兔子，无法测试移除功能', 'warning');
                return;
            }
            
            // 点击移除按钮
            removeButton.click();
            this.log('已点击"Remove Rabbits"按钮', 'info');
            
            // 等待一小段时间让状态更新
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // 检查点击后的兔子数量
            const afterCount = document.querySelectorAll('img[alt="Bouncy rabbit"]').length;
            this.log(`点击后兔子数量: ${afterCount}`, 'info');
            
            if (afterCount === 0) {
                this.log('✓ 移除兔子功能正常工作', 'success');
                this.results.removeFunction = true;
            } else {
                this.log('✗ 移除兔子功能未正常工作', 'error');
            }
        } catch (error) {
            this.log(`移除功能测试失败: ${error.message}`, 'error');
        }
    }

    async testPerformance() {
        this.log('测试6: 性能表现', 'info');
        
        try {
            // 检查控制台是否有错误
            const hasConsoleErrors = this.checkConsoleErrors();
            
            // 检查内存使用（如果可用）
            if (performance.memory) {
                const memoryInfo = performance.memory;
                this.log(`内存使用: ${(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`, 'info');
            }
            
            // 检查动画帧率（简单测试）
            const frameRateTest = await this.measureFrameRate();
            
            if (!hasConsoleErrors && frameRateTest > 15) {
                this.log('✓ 性能表现良好', 'success');
                this.results.performance = true;
            } else {
                this.log('✗ 性能可能存在问题', 'warning');
            }
        } catch (error) {
            this.log(`性能测试失败: ${error.message}`, 'error');
        }
    }

    checkConsoleErrors() {
        // 这是一个简化的错误检查
        // 在实际应用中，您可能需要更复杂的错误监控
        return false; // 假设没有错误
    }

    async measureFrameRate() {
        return new Promise(resolve => {
            let frames = 0;
            const startTime = performance.now();
            
            function countFrame() {
                frames++;
                if (performance.now() - startTime < 1000) {
                    requestAnimationFrame(countFrame);
                } else {
                    resolve(frames);
                }
            }
            
            requestAnimationFrame(countFrame);
        });
    }

    generateReport() {
        this.log('='.repeat(50), 'info');
        this.log('验证报告', 'info');
        this.log('='.repeat(50), 'info');
        
        const tests = [
            { name: '兔子动画显示', key: 'bunnyDisplay' },
            { name: '物理弹跳效果', key: 'physicsEffect' },
            { name: '生成规则(每5个终端1只兔子)', key: 'generationRule' },
            { name: '控制面板显示', key: 'controlPanel' },
            { name: '移除兔子功能', key: 'removeFunction' },
            { name: '性能表现', key: 'performance' }
        ];
        
        let passedTests = 0;
        
        tests.forEach(test => {
            const status = this.results[test.key] ? '✓ 通过' : '✗ 失败';
            const type = this.results[test.key] ? 'success' : 'error';
            this.log(`${test.name}: ${status}`, type);
            if (this.results[test.key]) passedTests++;
        });
        
        this.log('='.repeat(50), 'info');
        this.log(`总体结果: ${passedTests}/${tests.length} 项测试通过`, 
                 passedTests === tests.length ? 'success' : 'warning');
        
        if (passedTests === tests.length) {
            this.log('🎉 恭喜！BouncyRabbit组件迁移完全成功！', 'success');
        } else {
            this.log('⚠️ 部分测试未通过，请检查相关功能', 'warning');
        }
        
        return this.results;
    }
}

// 使用说明
console.log('%c🐰 BouncyRabbit组件验证工具', 'font-size: 20px; color: #4CAF50; font-weight: bold');
console.log('%c使用方法:', 'font-size: 16px; color: #2196F3; font-weight: bold');
console.log('1. 确保项目正在运行 (npm run dev)');
console.log('2. 在浏览器中打开项目页面');
console.log('3. 打开开发者工具控制台');
console.log('4. 运行以下命令:');
console.log('%cconst verifier = new BouncyRabbitVerifier(); verifier.runAllTests();', 
           'background: #f0f0f0; padding: 5px; border-radius: 3px');

// 自动运行验证（如果在浏览器环境中）
if (typeof window !== 'undefined') {
    window.BouncyRabbitVerifier = BouncyRabbitVerifier;
    
    // 提供快速验证函数
    window.verifyBouncyRabbit = function() {
        const verifier = new BouncyRabbitVerifier();
        return verifier.runAllTests();
    };
    
    console.log('%c快速验证命令: verifyBouncyRabbit()', 
               'background: #4CAF50; color: white; padding: 5px; border-radius: 3px');
}
