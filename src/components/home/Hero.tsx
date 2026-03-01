import { ArrowRight} from "lucide-react";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <section className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 pt-20 flex items-center relative overflow-hidden">
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full blur-[120px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-indigo-800 rounded-full blur-[150px] opacity-10 pointer-events-none" />

     
      <div className="max-w-7xl mx-auto px-4 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-bold px-4 py-1.5 rounded-full w-fit tracking-widest uppercase">
              New Arrivals Just Dropped
            </span>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
              Shop
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                Everything.
              </span>
              All In One.
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Discover thousands of products across fashion, electronics, and home — 
              all in one place, delivered to your door.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <Link 
                to="/products"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/25 group"
              >
                Shop Now 
                <ArrowRight size={20} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

          
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative w-112.5 h-112.5">
              <div className="absolute inset-0 rounded-full bg-linear-to-brfrom-indigo-500 to-violet-600 opacity-20 blur-3xl animate-pulse" />
              

              <div className="absolute inset-4 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center overflow-hidden shadow-2xl">
                 <img 
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800" 
                    alt="Hero Product"
                    className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                 />
              </div>

         
              <div className="absolute -bottom-right-10 bg-slate-900/80 backdrop-blur-lg border border-slate-700 p-4 rounded-2xl shadow-xl animate-pulse">
                 <div className="text-indigo-400 font-bold">50% OFF</div>
                 <div className="text-xs text-slate-400">Weekend Sale</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;