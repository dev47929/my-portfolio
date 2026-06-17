import React, { useState, useEffect } from "react";
import { Code, GitFork, ArrowUpRight, Cpu } from "lucide-react";

export default function LexicalParser() {
  const [selectedPreset, setSelectedPreset] = useState("vars");
  const [typedCode, setTypedCode] = useState("const sum = 12 + 30;");
  const [parsedTree, setParsedTree] = useState(null);

  const presets = {
    vars: {
      code: "const radius = 432;",
      tree: {
        type: "VariableDeclaration",
        name: "const",
        children: [
          {
            type: "VariableDeclarator",
            name: "radius",
            children: [
              {
                type: "Literal",
                value: "432",
              }
            ]
          }
        ]
      }
    },
    condition: {
      code: "if (speed > 100) { alarm(); }",
      tree: {
        type: "IfStatement",
        children: [
          {
            type: "BinaryExpression",
            name: "operator: >",
            children: [
              { type: "Identifier", name: "speed" },
              { type: "Literal", value: "100" }
            ]
          },
          {
            type: "BlockStatement",
            children: [
              {
                type: "CallExpression",
                name: "callee",
                children: [
                  { type: "Identifier", name: "alarm" }
                ]
              }
            ]
          }
        ]
      }
    },
    loop: {
      code: "while (active) { draw(); }",
      tree: {
        type: "WhileStatement",
        children: [
          { type: "Identifier", name: "active" },
          {
            type: "BlockStatement",
            children: [
              {
                type: "CallExpression",
                name: "callee",
                children: [
                  { type: "Identifier", name: "draw" }
                ]
              }
            ]
          }
        ]
      }
    }
  };

  // Trigger auto parsed alignment
  useEffect(() => {
    // Search matching preset code, else generate basic mock variable declaration tree
    const matchingPreset = Object.values(presets).find(p => p.code === typedCode);
    if (matchingPreset) {
      setParsedTree(matchingPreset.tree);
    } else {
      // Lazy parser for custom variables
      const varMatch = typedCode.match(/(const|let|var)\s+(\w+)\s*=\s*(.+)/);
      if (varMatch) {
        setParsedTree({
          type: "VariableDeclaration",
          name: varMatch[1],
          children: [
            {
              type: "VariableDeclarator",
              name: varMatch[2],
              children: [
                {
                  type: "Literal",
                  value: varMatch[3].trim().replace(/;$/, "")
                }
              ]
            }
          ]
        });
      } else {
        // Fallback default node
        setParsedTree({
          type: "ProgramBlock",
          name: "Anonymous scope",
          children: [
            { type: "ExpressionStatement", name: typedCode }
          ]
        });
      }
    }
  }, [typedCode]);

  const selectPreset = (key) => {
    setSelectedPreset(key);
    setTypedCode(presets[key].code);
  };

  // Recursive tree layout renderer
  const renderASTNode = (node, depth = 0, isLast = true) => {
    return (
      <div key={`${node.type}-${depth}-${node.name || ""}`} className="flex flex-col pl-4 border-l border-brand-border/60 relative mt-2 ml-2" id="ast-node-row">
        {/* Branch visual alignment beads */}
        <div className="absolute top-3 left-0 w-3 border-t border-brand-border/60" />

        <div className="flex items-center gap-2 bg-[#12161f]/80 border border-[#1e293b] px-3 py-1.5 rounded text-xs select-none shadow hover:border-[#00f0ff]/40 transition-colors">
          <span className="font-mono text-[9px] px-1 bg-[#1e293b] text-slate-400 rounded-sm uppercase tracking-wider font-semibold">
            {node.type}
          </span>
          {node.name && (
            <span className="font-mono font-medium text-amber-400">
              {node.name}
            </span>
          )}
          {node.value && (
            <span className="font-mono text-sky-400 bg-sky-500/5 px-1 py-0.5 border border-sky-500/10 rounded">
              value: {node.value}
            </span>
          )}
        </div>

        {node.children && node.children.length > 0 && (
          <div className="flex flex-col gap-1 mt-1 pl-2">
            {node.children.map((child, idx) =>
              renderASTNode(child, depth + 1, idx === node.children.length - 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col bg-[#0d1016] border border-[#1e293b] rounded-xl overflow-hidden shadow-2xl" id="lexical-parser-outer">
      {/* Simulation display screen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0" id="ast-body-dual">
        {/* Left Side: Code block console */}
        <div className="p-4 bg-[#0a0d13] border-b md:border-b-0 md:border-r border-[#1e293b]">
          <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]/70 mb-3">
            <span className="text-[10px] font-mono tracking-wider text-[#00f0ff] flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" /> SOURCE CODE CODEBOX
            </span>
            <span className="text-[9px] font-mono text-slate-500">
              JS Lexer 1.0b
            </span>
          </div>

          {/* Preset Buttons */}
          <div className="flex gap-1.5 mb-3">
            {Object.keys(presets).map((key) => (
              <button
                key={key}
                onClick={() => selectPreset(key)}
                className={`px-2 py-1 font-mono text-[9px] rounded uppercase tracking-wider transition-all border ${
                  selectedPreset === key
                    ? "bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff]"
                    : "border-[#1e293b] text-slate-500 hover:text-white"
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          <textarea
            value={typedCode}
            onChange={(e) => setTypedCode(e.target.value)}
            placeholder="Type declarations here (e.g. const value = 10;)"
            rows={5}
            className="w-full bg-[#040609] border border-[#1e293b] rounded-lg p-3 font-mono text-xs text-slate-300 focus:outline-none focus:border-[#00f0ff]/50 transition-colors resize-none"
          />

          <div className="text-[9px] font-mono text-slate-500 mt-2 flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-amber-500 animate-pulse" /> Try altering variables or values directly inside the console to see the custom parsed branches map!
          </div>
        </div>

        {/* Right Side: Tree Diagram representation */}
        <div className="p-4 bg-[#040608] min-h-[250px] overflow-auto scroll-smooth flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]/70 mb-2">
            <span className="text-[10px] font-mono tracking-wider text-[#fcc419] flex items-center gap-1.5">
              <GitFork className="w-3.5 h-3.5" /> LEXICAL ABSTRACT SYNTAX TREE
            </span>
            <span className="text-[9px] font-mono text-slate-500 flex items-center gap-0.5">
              Recurse: 0.1ms <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>

          {/* Parsed Tree representation blocks */}
          <div className="flex-1 py-2 flex flex-col justify-start">
            {parsedTree ? (
              renderASTNode(parsedTree)
            ) : (
              <span className="text-slate-600 font-mono text-[10px] italic">Waiting for parser signal...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
