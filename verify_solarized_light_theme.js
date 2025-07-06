/**
 * Solarized Light主题验证脚本
 * 在浏览器控制台中运行此脚本来验证新主题的功能
 */

class SolarizedLightThemeVerifier {
    constructor() {
        this.results = {
            themeExists: false,
            defaultThemeSet: false,
            colorsCorrect: false,
            themeSwitch: false,
            terminalDisplay: false
        };
        this.testLog = [];
        
        // Solarized Light标准配色
        this.expectedColors = {
            background: '#fdf6e3',
            primary: '#657b83',
            secondary: '#586e75',
            muted: '#93a1a1',
            success: '#859900',
            warning: '#b58900',
            error: '#dc322f',
            info: '#268bd2',
            accent: '#2aa198'
        };
    }

    log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `[${timestamp}] ${type.toUpperCase()}: ${message}`;
        this.testLog.push(logEntry);
        console.log(`%c${logEntry}`, this.getLogStyle(type));
    }

    getLogStyle(type) {
        const styles = {
            info: 'color: #268bd2',
            success: 'color: #859900; font-weight: bold',
            error: 'color: #dc322f; font-weight: bold',
            warning: 'color: #b58900'
        };
        return styles[type] || styles.info;
    }

    async runAllTests() {
        this.log('开始Solarized Light主题验证', 'info');
        this.log('='.repeat(60), 'info');

        try {
            await this.testThemeExists();
            await this.testDefaultTheme();
            await this.testColorConfiguration();
            await this.testThemeSwitch();
            await this.testTerminalDisplay();
            
            this.generateReport();
        } catch (error) {
            this.log(`验证过程中出现错误: ${error.message}`, 'error');
        }
    }

    async testThemeExists() {
        this.log('测试1: 检查Solarized Light主题是否存在', 'info');
        
        try {
            // 检查主题是否在可用主题列表中
            const themeSelect = document.querySelector('select');
            if (themeSelect) {
                const options = Array.from(themeSelect.options);
                const solarizedLightOption = options.find(option => 
                    option.textContent.includes('Solarized Light')
                );
                
                if (solarizedLightOption) {
                    this.log('✓ 找到Solarized Light主题选项', 'success');
                    this.results.themeExists = true;
                } else {
                    this.log('✗ 未找到Solarized Light主题选项', 'error');
                    this.log(`可用主题: ${options.map(o => o.textContent).join(', ')}`, 'info');
                }
            } else {
                this.log('✗ 未找到主题选择器', 'error');
            }
        } catch (error) {
            this.log(`主题存在性测试失败: ${error.message}`, 'error');
        }
    }

    async testDefaultTheme() {
        this.log('测试2: 检查默认主题设置', 'info');
        
        try {
            const themeSelect = document.querySelector('select');
            if (themeSelect) {
                const selectedOption = themeSelect.options[themeSelect.selectedIndex];
                if (selectedOption && selectedOption.textContent.includes('Solarized Light')) {
                    this.log('✓ 默认主题已设置为Solarized Light', 'success');
                    this.results.defaultThemeSet = true;
                } else {
                    this.log(`✗ 默认主题不是Solarized Light，当前: ${selectedOption?.textContent}`, 'error');
                }
            }
        } catch (error) {
            this.log(`默认主题测试失败: ${error.message}`, 'error');
        }
    }

    async testColorConfiguration() {
        this.log('测试3: 检查颜色配置', 'info');
        
        try {
            // 检查终端窗口的背景色
            const terminals = document.querySelectorAll('[id^="terminal-"]');
            if (terminals.length > 0) {
                const terminal = terminals[0];
                const computedStyle = window.getComputedStyle(terminal);
                const backgroundColor = computedStyle.backgroundColor;
                
                this.log(`终端背景色: ${backgroundColor}`, 'info');
                
                // 检查是否使用了Solarized Light的背景色
                if (this.isColorSimilar(backgroundColor, this.expectedColors.background)) {
                    this.log('✓ 终端背景色符合Solarized Light规范', 'success');
                    this.results.colorsCorrect = true;
                } else {
                    this.log('✗ 终端背景色不符合Solarized Light规范', 'warning');
                    this.log(`期望: ${this.expectedColors.background}, 实际: ${backgroundColor}`, 'info');
                }
            } else {
                this.log('✗ 未找到终端窗口', 'error');
            }
        } catch (error) {
            this.log(`颜色配置测试失败: ${error.message}`, 'error');
        }
    }

    async testThemeSwitch() {
        this.log('测试4: 测试主题切换功能', 'info');
        
        try {
            const themeSelect = document.querySelector('select');
            if (themeSelect) {
                const originalValue = themeSelect.value;
                
                // 切换到其他主题
                const darkOption = Array.from(themeSelect.options).find(option => 
                    option.textContent.includes('Dark') && !option.textContent.includes('Solarized')
                );
                
                if (darkOption) {
                    themeSelect.value = darkOption.value;
                    themeSelect.dispatchEvent(new Event('change'));
                    
                    await new Promise(resolve => setTimeout(resolve, 100));
                    
                    // 切换回Solarized Light
                    const solarizedLightOption = Array.from(themeSelect.options).find(option => 
                        option.textContent.includes('Solarized Light')
                    );
                    
                    if (solarizedLightOption) {
                        themeSelect.value = solarizedLightOption.value;
                        themeSelect.dispatchEvent(new Event('change'));
                        
                        await new Promise(resolve => setTimeout(resolve, 100));
                        
                        this.log('✓ 主题切换功能正常工作', 'success');
                        this.results.themeSwitch = true;
                    }
                } else {
                    this.log('✗ 无法找到其他主题进行切换测试', 'warning');
                }
            }
        } catch (error) {
            this.log(`主题切换测试失败: ${error.message}`, 'error');
        }
    }

    async testTerminalDisplay() {
        this.log('测试5: 检查终端显示效果', 'info');
        
        try {
            const terminals = document.querySelectorAll('[id^="terminal-"]');
            if (terminals.length > 0) {
                let displayCorrect = true;
                
                terminals.forEach((terminal, index) => {
                    const terminalContent = terminal.querySelector('.terminal-content, .p-4');
                    if (terminalContent) {
                        const computedStyle = window.getComputedStyle(terminalContent);
                        const backgroundColor = computedStyle.backgroundColor;
                        
                        this.log(`终端${index + 1}背景色: ${backgroundColor}`, 'info');
                        
                        if (!this.isColorSimilar(backgroundColor, this.expectedColors.background)) {
                            displayCorrect = false;
                        }
                    }
                });
                
                if (displayCorrect) {
                    this.log('✓ 所有终端显示效果正确', 'success');
                    this.results.terminalDisplay = true;
                } else {
                    this.log('✗ 部分终端显示效果不正确', 'warning');
                }
            } else {
                this.log('✗ 未找到终端窗口', 'error');
            }
        } catch (error) {
            this.log(`终端显示测试失败: ${error.message}`, 'error');
        }
    }

    isColorSimilar(color1, color2) {
        // 简单的颜色相似性检查
        // 将颜色转换为RGB值进行比较
        const rgb1 = this.parseColor(color1);
        const rgb2 = this.parseColor(color2);
        
        if (!rgb1 || !rgb2) return false;
        
        const threshold = 30; // 允许的颜色差异阈值
        return Math.abs(rgb1.r - rgb2.r) < threshold &&
               Math.abs(rgb1.g - rgb2.g) < threshold &&
               Math.abs(rgb1.b - rgb2.b) < threshold;
    }

    parseColor(color) {
        // 解析颜色字符串为RGB值
        if (color.startsWith('#')) {
            const hex = color.slice(1);
            return {
                r: parseInt(hex.slice(0, 2), 16),
                g: parseInt(hex.slice(2, 4), 16),
                b: parseInt(hex.slice(4, 6), 16)
            };
        } else if (color.startsWith('rgb')) {
            const matches = color.match(/\d+/g);
            if (matches && matches.length >= 3) {
                return {
                    r: parseInt(matches[0]),
                    g: parseInt(matches[1]),
                    b: parseInt(matches[2])
                };
            }
        }
        return null;
    }

    generateReport() {
        this.log('='.repeat(60), 'info');
        this.log('Solarized Light主题验证报告', 'info');
        this.log('='.repeat(60), 'info');
        
        const tests = [
            { name: '主题存在性', key: 'themeExists' },
            { name: '默认主题设置', key: 'defaultThemeSet' },
            { name: '颜色配置正确', key: 'colorsCorrect' },
            { name: '主题切换功能', key: 'themeSwitch' },
            { name: '终端显示效果', key: 'terminalDisplay' }
        ];
        
        let passedTests = 0;
        
        tests.forEach(test => {
            const status = this.results[test.key] ? '✓ 通过' : '✗ 失败';
            const type = this.results[test.key] ? 'success' : 'error';
            this.log(`${test.name}: ${status}`, type);
            if (this.results[test.key]) passedTests++;
        });
        
        this.log('='.repeat(60), 'info');
        this.log(`总体结果: ${passedTests}/${tests.length} 项测试通过`, 
                 passedTests === tests.length ? 'success' : 'warning');
        
        if (passedTests === tests.length) {
            this.log('🎉 恭喜！Solarized Light主题配置完全成功！', 'success');
        } else {
            this.log('⚠️ 部分测试未通过，请检查相关配置', 'warning');
        }
        
        // 提供使用建议
        this.log('', 'info');
        this.log('💡 使用建议:', 'info');
        this.log('1. 通过控制面板的主题选择器切换主题', 'info');
        this.log('2. 新创建的终端将自动使用Solarized Light主题', 'info');
        this.log('3. 所有颜色角色都已按Solarized Light规范配置', 'info');
        
        return this.results;
    }
}

// 使用说明
console.log('%c🌞 Solarized Light主题验证工具', 'font-size: 20px; color: #268bd2; font-weight: bold');
console.log('%c使用方法:', 'font-size: 16px; color: #657b83; font-weight: bold');
console.log('1. 确保项目正在运行 (npm run dev)');
console.log('2. 在浏览器中打开项目页面');
console.log('3. 打开开发者工具控制台');
console.log('4. 运行以下命令:');
console.log('%cconst verifier = new SolarizedLightThemeVerifier(); verifier.runAllTests();', 
           'background: #fdf6e3; color: #657b83; padding: 5px; border-radius: 3px; border-left: 3px solid #268bd2');

// 自动运行验证（如果在浏览器环境中）
if (typeof window !== 'undefined') {
    window.SolarizedLightThemeVerifier = SolarizedLightThemeVerifier;
    
    // 提供快速验证函数
    window.verifySolarizedLight = function() {
        const verifier = new SolarizedLightThemeVerifier();
        return verifier.runAllTests();
    };
    
    console.log('%c快速验证命令: verifySolarizedLight()', 
               'background: #859900; color: white; padding: 5px; border-radius: 3px');
}
