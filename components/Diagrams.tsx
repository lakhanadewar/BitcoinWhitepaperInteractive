/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, PenTool, Hash, Play, Pause, RotateCcw, Box as BoxIcon, TreePine } from 'lucide-react';

// --- TRANSACTION CHAIN DIAGRAM ---
export const TransactionChain: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const transactions = [
    { owner: "Satoshi", to: "Hal Finney", amount: "10 BTC", color: "bg-bitcoin-orange" },
    { owner: "Hal Finney", to: "Peer B", amount: "5 BTC", color: "bg-blue-500" },
    { owner: "Peer B", to: "Peer C", amount: "2.5 BTC", color: "bg-emerald-500" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
        setActiveStep(s => (s + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h3 className="font-serif text-xl mb-8 text-bitcoin-dark">The Ownership Chain</h3>
      
      <div className="relative w-full max-w-md h-80 flex flex-col gap-6">
        {transactions.map((tx, idx) => (
            <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                    opacity: activeStep >= idx ? 1 : 0.2, 
                    x: activeStep >= idx ? 0 : -20,
                    scale: activeStep === idx ? 1.05 : 1
                }}
                className={`relative p-4 rounded-xl border border-bitcoin-dark/5 shadow-sm ${activeStep === idx ? 'bg-white ring-2 ring-bitcoin-orange/20' : 'bg-white/50'}`}
            >
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-bitcoin-orange">Transaction {idx + 1}</span>
                    <div className="flex gap-1">
                        <Key size={12} className="text-bitcoin-slate/40" />
                        <PenTool size={12} className="text-bitcoin-slate/40" />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${tx.color} flex items-center justify-center text-white text-[10px] font-bold`}>{tx.owner[0]}</div>
                    <div className="flex-1">
                        <div className="text-xs font-bold text-bitcoin-dark">To: {tx.to}</div>
                        <div className="text-[10px] text-bitcoin-slate/60">Prev Hash: {idx === 0 ? '000...00' : '8a3f...d2'}</div>
                    </div>
                    <div className="text-sm font-bold text-bitcoin-orange">{tx.amount}</div>
                </div>
                
                {idx < transactions.length - 1 && (
                    <div className="absolute -bottom-6 left-8 w-[2px] h-6 bg-bitcoin-orange/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-bitcoin-orange animate-pulse" />
                    </div>
                )}
            </motion.div>
        ))}
      </div>
      
      <div className="mt-8 text-center max-w-xs">
          <p className="text-xs text-bitcoin-slate/50 italic leading-relaxed">
            "A payee can verify the signatures to verify the chain of ownership."
          </p>
      </div>
    </div>
  );
};

// --- PROOF OF WORK SIMULATOR ---
export const ProofOfWorkSim: React.FC = () => {
    const [mining, setMining] = useState(false);
    const [nonce, setNonce] = useState(0);
    const [difficulty, setDifficulty] = useState(4); // leading zeros
    const [found, setFound] = useState(false);
    const intervalRef = useRef<number>(0);

    const startMining = () => {
        setMining(true);
        setFound(false);
        setNonce(0);
    };

    const stopMining = () => {
        setMining(false);
        if (intervalRef.current) window.clearInterval(intervalRef.current);
    };

    useEffect(() => {
        if (mining && !found) {
            intervalRef.current = window.setInterval(() => {
                setNonce(prev => {
                    // Check if "solved" - simulated difficulty
                    const luckFactor = 0.005 / Math.pow(10, difficulty - 1);
                    if (Math.random() < luckFactor) {
                        setFound(true);
                        setMining(false);
                        return prev;
                    }
                    return prev + Math.floor(Math.random() * 1000) + 1;
                });
            }, 50);
        } else {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
        }
        return () => { if (intervalRef.current) window.clearInterval(intervalRef.current); };
    }, [mining, found, difficulty]);

    const mockHash = (n: number) => {
        const hex = "0".repeat(difficulty) + n.toString(16).padStart(64 - difficulty, 'a' + n % 9);
        return hex.substring(0, 48) + "...";
    };

    return (
        <div className="bg-stone-900 rounded-3xl p-8 border border-white/5 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-bitcoin-orange/20 rounded-xl flex items-center justify-center text-bitcoin-orange">
                        <Hash size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white">Block Miner</h4>
                        <div className="text-[10px] text-stone-500">SHA-256 Simulation</div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={mining ? stopMining : startMining} className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${found ? 'bg-emerald-500 text-white' : 'bg-bitcoin-orange text-white hover:scale-105'}`}>
                        {mining ? <span className="flex items-center gap-2"><Pause size={12}/> STOP</span> : (found ? <span className="flex items-center gap-2"><RotateCcw size={12}/> RESET</span> : <span className="flex items-center gap-2"><Play size={12}/> START MINING</span>)}
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="text-[10px] uppercase font-bold text-stone-500 mb-2 block">Difficulty (Leading Zeros)</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(d => (
                            <button 
                                key={d} 
                                onClick={() => { setDifficulty(d); setFound(false); setNonce(0); }}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${difficulty === d ? 'bg-bitcoin-orange text-white' : 'bg-white/5 text-stone-500 hover:bg-white/10'}`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-black rounded-xl font-mono text-sm space-y-3 border border-white/5">
                    <div className="flex justify-between items-center">
                        <span className="text-stone-600">NONCE:</span>
                        <span className="text-bitcoin-orange">{nonce.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-stone-600 text-[10px] uppercase font-bold">CURRENT HASH:</span>
                        <span className={`break-all leading-tight transition-colors ${found ? 'text-emerald-400' : 'text-stone-300'}`}>
                            {mockHash(nonce)}
                        </span>
                    </div>
                </div>

                {found && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                        <BoxIcon className="text-emerald-500" size={18} />
                        <p className="text-xs text-emerald-500 font-medium">Valid Proof-of-Work found! Block added to chain.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

// --- MERKLE TREE DIAGRAM ---
export const MerkleTreeDiagram: React.FC = () => {
    const [pruned, setPruned] = useState(false);

    return (
        <div className="flex flex-col items-center p-8 bg-bitcoin-cream rounded-3xl border border-bitcoin-orange/5 shadow-inner">
            <div className="flex justify-between w-full mb-8">
                <h4 className="font-serif text-lg text-bitcoin-dark">Merkle Tree Pruning</h4>
                <button 
                    onClick={() => setPruned(!pruned)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${pruned ? 'bg-bitcoin-orange text-white' : 'bg-bitcoin-dark text-white'}`}
                >
                    {pruned ? "RESTORE DATA" : "PRUNE OLD TXs"}
                </button>
            </div>

            <div className="relative w-full max-w-sm aspect-video flex flex-col items-center">
                {/* Root */}
                <div className="w-20 h-10 bg-bitcoin-dark text-white rounded-lg flex items-center justify-center text-[10px] font-bold shadow-lg z-20">ROOT HASH</div>
                
                {/* Connections Level 1 */}
                <div className="w-48 h-12 flex justify-between relative">
                    <div className="absolute top-[-10px] left-1/2 w-px h-full bg-bitcoin-dark/10 -translate-x-1/2" />
                    <div className="w-16 h-8 mt-4 bg-bitcoin-slate text-white/80 rounded-lg flex items-center justify-center text-[8px] font-bold border border-white/10">HASH 01</div>
                    <div className="w-16 h-8 mt-4 bg-bitcoin-slate text-white/80 rounded-lg flex items-center justify-center text-[8px] font-bold border border-white/10">HASH 23</div>
                </div>

                {/* Connections Level 2 */}
                <div className="w-full flex justify-between mt-6 px-4">
                    {[0, 1, 2, 3].map(i => (
                        <AnimatePresence key={i}>
                            {(!pruned || i === 3) ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                    className={`w-12 h-12 rounded-xl border-2 flex flex-col items-center justify-center ${i === 3 ? 'border-bitcoin-orange bg-white' : 'border-bitcoin-dark/10 bg-white/50'}`}
                                >
                                    <span className="text-[8px] font-bold uppercase text-bitcoin-slate/40">TX {i}</span>
                                    <span className="text-[10px] font-mono font-bold text-bitcoin-dark">0x..{i}</span>
                                </motion.div>
                            ) : (
                                <div className="w-12 h-12 rounded-xl border-2 border-dashed border-bitcoin-dark/5" />
                            )}
                        </AnimatePresence>
                    ))}
                </div>
            </div>

            <p className="mt-8 text-xs text-bitcoin-slate/50 text-center leading-relaxed italic px-8">
                {pruned ? 
                  "Old blocks are compacted by stubbing off branches. The root hash remains valid." : 
                  "Transactions are hashed in a Merkle Tree, with only the root included in the block's hash."}
            </p>
        </div>
    );
};

// --- ATTACKER PROBABILITY CHART ---
export const AttackerProbabilityChart: React.FC = () => {
    const [q, setQ] = useState(0.1); // Attacker's relative power
    
    // Simplistic visual representation of probability q_z
    // Based on paper results: for q=0.1, z=5, P=0.0009
    const getProb = (z: number, power: number) => {
        if (power >= 0.5) return 1.0;
        const p = 1 - power;
        const lambda = z * (power / p);
        
        // Approximate Poisson tail for visualization
        let sum = 1.0;
        let poisson = Math.exp(-lambda);
        for (let k = 0; k <= z; k++) {
            if (k > 0) poisson *= lambda / k;
            sum -= poisson * (1 - Math.pow(power / p, z - k));
        }
        return Math.max(0, sum);
    };

    const points = Array.from({ length: 11 }, (_, i) => ({ z: i, p: getProb(i, q) }));

    return (
        <div className="bg-stone-900 rounded-3xl p-10 border border-white/5 shadow-2xl h-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h4 className="font-serif text-2xl text-white mb-1">Catch-up Probability</h4>
                    <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">Attacker catching honest chain from z blocks behind</p>
                </div>
                <div className="bg-black/40 p-2 rounded-xl border border-white/5">
                    <label className="text-[10px] uppercase font-bold text-stone-500 mb-2 block px-2">Attacker Hashrate (q)</label>
                    <div className="flex gap-1">
                        {[0.1, 0.2, 0.3, 0.45].map(val => (
                            <button 
                                key={val} 
                                onClick={() => setQ(val)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${q === val ? 'bg-bitcoin-orange text-white shadow-lg' : 'text-stone-500 hover:text-stone-300'}`}
                            >
                                {val * 100}%
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="h-64 flex items-end gap-1 md:gap-3 relative">
                {/* Horizontal lines */}
                <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                    <div className="w-full h-px bg-white" />
                    <div className="w-full h-px bg-white" />
                    <div className="w-full h-px bg-white" />
                    <div className="w-full h-px bg-white" />
                </div>

                {points.map((pt, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end items-center group h-full">
                        <div className="relative w-full flex items-end justify-center mb-2">
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${pt.p * 100}%` }}
                                className={`w-full max-w-[40px] rounded-t-lg transition-colors ${pt.p < 0.001 ? 'bg-emerald-500' : (pt.p < 0.1 ? 'bg-bitcoin-orange' : 'bg-red-500')}`}
                            />
                            {/* Value tooltip */}
                            <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[8px] font-bold text-white bg-black/80 px-2 py-1 rounded">
                                P = {pt.p.toFixed(4)}
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-stone-600">z={pt.z}</span>
                    </div>
                ))}
            </div>

            <div className="mt-10 flex gap-6 text-[10px] uppercase font-bold tracking-widest text-stone-500">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> High Risk</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-bitcoin-orange"></div> Moderate</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Secure</div>
            </div>
        </div>
    );
};