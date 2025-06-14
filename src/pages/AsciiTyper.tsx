import { useState } from 'react';
import { generateAsciiArt } from '../utils/asciiArt';

interface TextLine {
  id: string;
  text: string;
}

const PRESET_COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#ffffff' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Gray Dark', value: '#374151' },
  { name: 'Gray Light', value: '#9ca3af' },
];

export function AsciiTyper() {
  const [lines, setLines] = useState<TextLine[]>([
    { id: '1', text: '' }
  ]);
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [textColor, setTextColor] = useState('#22c55e');

  const addNewLine = () => {
    const newId = Date.now().toString();
    setLines(prev => [...prev, { id: newId, text: '' }]);
  };

  const updateLineText = (id: string, newText: string) => {
    setLines(prev => prev.map(line => 
      line.id === id ? { ...line, text: newText } : line
    ));
  };

  const removeLine = (id: string) => {
    if (lines.length > 1) {
      setLines(prev => prev.filter(line => line.id !== id));
    }
  };

  const generatePreview = () => {
    if (lines.every(line => line.text.trim() === '')) {
      return ['', '', '', '', '', ''];
    }
    
    const textLines = lines
      .filter(line => line.text.trim() !== '')
      .map(line => line.text.toUpperCase());
    
    const result: string[] = [];
    
    for (const textLine of textLines) {
      const asciiLines = generateAsciiArt(textLine);
      result.push(...asciiLines);
      // Add spacing between lines
      if (textLine !== textLines[textLines.length - 1]) {
        result.push('');
      }
    }
    
    return result;
  };

  const copyToClipboard = () => {
    const asciiText = generatePreview().join('\n');
    navigator.clipboard.writeText(asciiText);
  };

  return (
    <div
      className="h-screen overflow-y-auto p-8 transition-colors duration-300"
      style={{ backgroundColor }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: textColor }}>
            ASCII Art Typer
          </h1>
          <p className="text-lg opacity-80" style={{ color: textColor }}>
            Type text and see it converted to ASCII art in real-time
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Background Color */}
          <div>
            <h3 className="text-lg font-semibold mb-3" style={{ color: textColor }}>
              Background Color
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setBackgroundColor(color.value)}
                  className={`w-12 h-12 rounded border-2 transition-all hover:scale-110 ${
                    backgroundColor === color.value ? 'border-white border-4' : 'border-gray-400'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="mt-2 w-full h-8 rounded cursor-pointer"
            />
          </div>

          {/* Text Color */}
          <div>
            <h3 className="text-lg font-semibold mb-3" style={{ color: textColor }}>
              Text Color
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setTextColor(color.value)}
                  className={`w-12 h-12 rounded border-2 transition-all hover:scale-110 ${
                    textColor === color.value ? 'border-white border-4' : 'border-gray-400'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="mt-2 w-full h-8 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Text Input Lines */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold" style={{ color: textColor }}>
              Text Lines
            </h3>
            <button
              onClick={addNewLine}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              Add Line
            </button>
          </div>
          
          <div className="space-y-3">
            {lines.map((line, index) => (
              <div key={line.id} className="flex gap-3 items-center">
                <span className="text-sm font-mono w-8" style={{ color: textColor }}>
                  {index + 1}:
                </span>
                <input
                  type="text"
                  value={line.text}
                  onChange={(e) => updateLineText(line.id, e.target.value)}
                  placeholder="Type your text here..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {lines.length > 1 && (
                  <button
                    onClick={() => removeLine(line.id)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold" style={{ color: textColor }}>
              ASCII Preview
            </h3>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
            >
              Copy to Clipboard
            </button>
          </div>
          
          <div 
            className="p-6 rounded-lg border-2 font-mono text-xs leading-tight overflow-auto"
            style={{ 
              backgroundColor: backgroundColor,
              borderColor: textColor,
              color: textColor
            }}
          >
            <pre>
              {generatePreview().map((line, index) => (
                <div key={index} className="whitespace-pre">
                  {line || '\u00A0'} {/* Non-breaking space for empty lines */}
                </div>
              ))}
            </pre>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-sm opacity-70" style={{ color: textColor }}>
          <p>• Type in the text fields above to see ASCII art generated in real-time</p>
          <p>• Use the + button to add new lines</p>
          <p>• Customize colors using the color pickers or preset swatches</p>
          <p>• Copy the generated ASCII art to use elsewhere</p>
        </div>
      </div>
    </div>
  );
}