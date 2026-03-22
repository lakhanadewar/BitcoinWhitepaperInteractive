/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, NetworkScene } from './components/BitcoinScene';
import { TransactionChain, ProofOfWorkSim, MerkleTreeDiagram, AttackerProbabilityChart } from './components/Diagrams';
import { ArrowDown, Menu, X, Shield, Cpu, Zap, Lock, Globe } from 'lucide-react';

const SectionHeader = ({ title, subtitle, id }: { title: string, subtitle: string, id: string }) => (
  <div className="mb-12" id={id}>
    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-bitcoin-orange uppercase">{subtitle}</div>
    <h2 className="font-serif text-4xl md:text-5xl mb-4 text-bitcoin-dark leading-tight">{title}</h2>
    <div className="w-16 h-1 bg-bitcoin-orange"></div>
  </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-bitcoin-cream text-bitcoin-dark selection:bg-bitcoin-orange selection:text-white font-sans">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-bitcoin-orange rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-bitcoin-orange/10">₿</div>
            <span className={`font-serif font-bold text-xl tracking-tight transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              BITCOIN <span className="font-light text-bitcoin-slate/60">WHITEPAPER</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-xs font-bold tracking-[0.15em] text-bitcoin-slate/70">
            <a href="#abstract" onClick={scrollToSection('abstract')} className="hover:text-bitcoin-orange transition-colors cursor-pointer uppercase">The Vision</a>
            <a href="#pow" onClick={scrollToSection('pow')} className="hover:text-bitcoin-orange transition-colors cursor-pointer uppercase">Proof-of-Work</a>
            <a href="#network" onClick={scrollToSection('network')} className="hover:text-bitcoin-orange transition-colors cursor-pointer uppercase">The Network</a>
            <a href="#security" onClick={scrollToSection('security')} className="hover:text-bitcoin-orange transition-colors cursor-pointer uppercase">Security</a>
            <a 
              href="https://bitcoin.org/bitcoin.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-2.5 bg-bitcoin-dark text-white rounded-full hover:bg-bitcoin-orange transition-all shadow-md hover:shadow-bitcoin-orange/20 cursor-pointer"
            >
              Original PDF
            </a>
          </div>

          <button className="md:hidden text-bitcoin-dark p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
        <HeroScene />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A]/80 z-0" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 border border-bitcoin-orange/40 text-bitcoin-orange text-[10px] tracking-[0.3em] uppercase font-bold rounded-full bg-bitcoin-orange/5 backdrop-blur-md animate-fade-in">
            October 31, 2008
          </div>
          <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl font-bold leading-[1.1] mb-8 text-white">
            A Peer-to-Peer <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bitcoin-orange to-amber-200">Electronic Cash</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-stone-400 font-light leading-relaxed mb-12 animate-fade-in-up">
            A purely peer-to-peer version of electronic cash would allow online payments to be sent directly from one party to another without going through a financial institution.
          </p>
          
          <div className="flex justify-center animate-bounce mt-12">
             <a href="#abstract" onClick={scrollToSection('abstract')} className="p-3 border border-white/20 rounded-full text-white/50 hover:text-white hover:border-white transition-all">
                <ArrowDown size={24} />
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Abstract & Introduction */}
        <section id="abstract" className="py-32 bg-bitcoin-cream relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 items-start relative z-10">
            <div className="md:col-span-5">
              <SectionHeader title="The Triple Entry Problem" subtitle="01. Abstract" id="abstract-trigger" />
              <div className="space-y-6 text-bitcoin-slate/80 text-lg leading-relaxed italic border-l-4 border-bitcoin-orange/20 pl-6">
                "Commerce on the Internet has come to rely almost exclusively on financial institutions serving as trusted third parties. While the system works well enough for most transactions, it still suffers from the inherent weaknesses of the trust based model."
              </div>
            </div>
            <div className="md:col-span-7 text-xl text-bitcoin-dark/80 leading-relaxed space-y-8">
              <p className="drop-cap">
                What is needed is an electronic payment system based on cryptographic proof instead of trust, allowing any two willing parties to transact directly with each other without the need for a trusted third party.
              </p>
              <p>
                In this paper, we propose a solution to the double-spending problem using a peer-to-peer distributed timestamp server to generate computational proof of the chronological order of transactions.
              </p>
            </div>
          </div>
        </section>

        {/* Transactions Section */}
        <section id="transactions" className="py-24 bg-white border-y border-bitcoin-orange/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <SectionHeader title="Digital Ownership" subtitle="02. Transactions" id="transactions-id" />
                        <p className="text-lg text-bitcoin-slate/80 mb-8 leading-relaxed">
                           We define an electronic coin as a chain of digital signatures. Each owner transfers the coin to the next by digitally signing a hash of the previous transaction and the public key of the next owner.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-bitcoin-cream rounded-xl border border-bitcoin-orange/10">
                                <Lock className="text-bitcoin-orange mb-3" size={24} />
                                <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Public Key</h4>
                                <p className="text-xs text-bitcoin-slate/60">Identifying the recipient without revealing identity.</p>
                            </div>
                            <div className="p-6 bg-bitcoin-cream rounded-xl border border-bitcoin-orange/10">
                                <Shield className="text-bitcoin-orange mb-3" size={24} />
                                <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Signatures</h4>
                                <p className="text-xs text-bitcoin-slate/60">Ensuring the transaction cannot be forged.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-bitcoin-cream p-8 rounded-3xl shadow-inner border border-bitcoin-orange/5">
                        <TransactionChain />
                    </div>
                </div>
            </div>
        </section>

        {/* Proof of Work */}
        <section id="pow" className="py-24 bg-bitcoin-dark text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
                <Cpu className="w-full h-full text-bitcoin-orange rotate-12" />
            </div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                     <div className="order-2 lg:order-1">
                        <ProofOfWorkSim />
                     </div>
                     <div className="order-1 lg:order-2">
                        <SectionHeader title="Hash-Based Consensus" subtitle="04. Proof-of-Work" id="pow-id" />
                        <p className="text-lg text-stone-400 mb-8 leading-relaxed">
                            To implement a distributed timestamp server, we use a proof-of-work system similar to Adam Back's Hashcash. The work involves scanning for a value that, when hashed (SHA-256), begins with a number of zero bits.
                        </p>
                        <p className="text-lg text-stone-400 leading-relaxed border-l-2 border-bitcoin-orange/40 pl-6">
                            "Once the CPU effort has been expended to make it satisfy the proof-of-work, the block cannot be changed without redoing the work. As later blocks are chained after it, the work to change the block would include redoing all the blocks after it."
                        </p>
                     </div>
                </div>
            </div>
        </section>

        {/* The Network Steps */}
        <section id="network" className="py-32 bg-bitcoin-cream">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <SectionHeader title="The Protocol Engine" subtitle="05. Network" id="network-steps" />
                    <p className="text-bitcoin-slate/60 text-lg">The mechanism that maintains global state without a central coordinator.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { step: "1", title: "Broadcast", desc: "New transactions are broadcast to all nodes globally." },
                        { step: "2", title: "Collect", desc: "Each node collects new transactions into a block." },
                        { step: "3", title: "Solve", desc: "Each node works on finding a difficult proof-of-work." },
                        { step: "4", title: "Announce", desc: "When a node finds a proof-of-work, it broadcasts the block." },
                        { step: "5", title: "Verify", desc: "Nodes accept the block only if all transactions are valid." },
                        { step: "6", title: "Extend", desc: "Nodes work on creating the next block using the previous hash." }
                    ].map((item, idx) => (
                        <div key={idx} className="p-8 bg-white rounded-2xl border border-bitcoin-orange/5 shadow-sm hover:shadow-md transition-all group">
                            <div className="w-10 h-10 bg-bitcoin-cream rounded-lg flex items-center justify-center text-bitcoin-orange font-bold mb-6 group-hover:bg-bitcoin-orange group-hover:text-white transition-colors">{item.step}</div>
                            <h3 className="font-serif text-xl mb-4 text-bitcoin-dark">{item.title}</h3>
                            <p className="text-sm text-bitcoin-slate/60 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Disk Space & Merkle Trees */}
        <section id="disk" className="py-24 bg-white border-t border-bitcoin-orange/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <SectionHeader title="Infinite Scalability" subtitle="07. Reclaiming Disk Space" id="disk-id" />
                        <p className="text-lg text-bitcoin-slate/80 mb-8 leading-relaxed">
                            Once the latest transaction in a coin is buried under enough blocks, the spent transactions before it can be discarded to save disk space. To facilitate this without breaking the block's hash, transactions are hashed in a <strong>Merkle Tree</strong>.
                        </p>
                        <div className="flex items-center gap-6 p-6 bg-bitcoin-cream rounded-2xl">
                             <Zap className="text-bitcoin-orange shrink-0" size={32} />
                             <p className="text-sm font-medium italic">"A block header with no transactions would be about 80 bytes. If we suppose blocks are generated every 10 minutes... storage should not be a problem."</p>
                        </div>
                    </div>
                    <div>
                        <MerkleTreeDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* Probability & Calculations */}
        <section id="security" className="py-24 bg-bitcoin-dark text-white">
            <div className="container mx-auto px-6">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <SectionHeader title="The Attacker's Ruin" subtitle="11. Calculations" id="security-id" />
                        <p className="text-lg text-stone-400 mb-8 leading-relaxed">
                            The race between the honest chain and an attacker chain can be characterized as a Binomial Random Walk. We calculate the probability an attacker ever catches up with the honest chain.
                        </p>
                        <div className="p-8 bg-stone-900/50 rounded-2xl border border-white/5 font-mono text-xs space-y-4">
                            <div className="flex justify-between items-center text-bitcoin-orange">
                                <span>p = prob honest node finds block</span>
                                <span>q = 1 - p</span>
                            </div>
                            <div className="h-[1px] bg-white/10" />
                            <div className="text-sm leading-relaxed">
                                q<sub>z</sub> = 1 - Σ<sub>k=0</sub><sup>z</sup> (λ<sup>k</sup>e<sup>-λ</sup> / k!)(1 - (q/p)<sup>z-k</sup>)
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <AttackerProbabilityChart />
                    </div>
                 </div>
            </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="py-32 bg-white relative overflow-hidden">
             <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
                <div className="md:col-span-5">
                    <div className="aspect-square bg-bitcoin-cream rounded-3xl overflow-hidden relative border border-bitcoin-orange/10 shadow-xl group">
                        <NetworkScene />
                        <div className="absolute inset-0 bg-bitcoin-orange/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-xl text-xs text-bitcoin-slate/60 font-serif italic border border-white/20">
                            Simulated Nodes connecting in a P2P Mesh Network
                        </div>
                    </div>
                </div>
                <div className="md:col-span-7">
                    <SectionHeader title="A New Architecture of Trust" subtitle="12. Conclusion" id="final" />
                    <p className="text-xl text-bitcoin-dark/80 mb-8 leading-relaxed font-serif italic">
                        "The network is robust in its unstructured simplicity. Nodes work all at once with little coordination. They do not need to be identified... they vote with their CPU power, expressing their acceptance of valid blocks."
                    </p>
                    <p className="text-lg text-bitcoin-slate/70 mb-12 leading-relaxed">
                        Bitcoin solved the double-spending problem without relying on a central authority, creating the first decentralized ledger that has remained operational for over a decade.
                    </p>
                    
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-bitcoin-orange rounded-full flex items-center justify-center shadow-lg">
                            <Globe className="text-white" size={32} />
                        </div>
                        <div>
                            <div className="text-sm font-bold tracking-widest uppercase text-bitcoin-orange">Satoshi Nakamoto</div>
                            <div className="text-bitcoin-slate/50 text-xs">satoshin@gmx.com | October 2008</div>
                        </div>
                    </div>
                </div>
             </div>
        </section>
      </main>

      <footer className="bg-bitcoin-dark text-stone-500 py-24 border-t border-white/5">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
                <div className="text-white font-serif font-bold text-2xl mb-6">₿ Bitcoin</div>
                <p className="text-sm leading-relaxed max-w-xs">An interactive exploration of the fundamental protocol that changed the world of finance forever.</p>
            </div>
            <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest">
                <h4 className="text-stone-300 mb-2">Key Sections</h4>
                <a href="#pow" onClick={scrollToSection('pow')} className="hover:text-bitcoin-orange">Proof of Work</a>
                <a href="#disk" onClick={scrollToSection('disk')} className="hover:text-bitcoin-orange">Merkle Trees</a>
                <a href="#security" onClick={scrollToSection('security')} className="hover:text-bitcoin-orange">Network Security</a>
            </div>
            <div className="text-right flex flex-col justify-end">
                <p className="text-xs text-stone-600 mb-2">Based on "Bitcoin: A Peer-to-Peer Electronic Cash System"</p>
                <p className="text-[10px] text-bitcoin-orange/40 font-mono">HASH: 000000000019D6689C085AE165831E934FF763AE46A2A6C172B3F1B60A8CE26F</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;