import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  ArrowRight, 
  ArrowLeft, 
  SkipForward, 
  Volume2, 
  Pencil, 
  BookOpen, 
  Home, 
  Eraser, 
  Trash2,
  Settings,
  Star
} from 'lucide-react';

// --- DATA: 18 Words per Letter ---
const ALPHABET_DATA = [
  { letter: 'A', words: ['Apple', 'Ant', 'Alligator', 'Airplane', 'Angel', 'Arm', 'Arrow', 'Anchor', 'Axe', 'Avocado', 'Astronaut', 'Apron', 'Art', 'Alarm', 'Ambulance', 'Acorn', 'Aquarium', 'Anteater'] },
  { letter: 'B', words: ['Ball', 'Bear', 'Banana', 'Balloon', 'Boat', 'Butterfly', 'Bird', 'Bed', 'Bee', 'Book', 'Box', 'Bus', 'Baby', 'Bell', 'Bike', 'Boot', 'Bread', 'Button'] },
  { letter: 'C', words: ['Cat', 'Car', 'Cake', 'Cup', 'Cow', 'Cookie', 'Clock', 'Cloud', 'Camera', 'Candy', 'Corn', 'Carrot', 'Castle', 'Crab', 'Caterpillar', 'Coat', 'Comb', 'Crayon'] },
  { letter: 'D', words: ['Dog', 'Duck', 'Doll', 'Door', 'Drum', 'Dragon', 'Donut', 'Dress', 'Desk', 'Dolphin', 'Doctor', 'Dinosaur', 'Dice', 'Diamond', 'Deer', 'Daisy', 'Dish', 'Dad'] },
  { letter: 'E', words: ['Elephant', 'Egg', 'Eye', 'Ear', 'Earth', 'Engine', 'Eagle', 'Eraser', 'Eight', 'Envelope', 'Exit', 'Elbow', 'Elf', 'Elevator', 'Easel', 'Eel', 'Eggplant', 'Emu'] },
  { letter: 'F', words: ['Fish', 'Frog', 'Fan', 'Flower', 'Fire', 'Flag', 'Fox', 'Fork', 'Five', 'Foot', 'Feather', 'Fence', 'Farm', 'Fairy', 'Fruit', 'Fly', 'Football', 'Forest'] },
  { letter: 'G', words: ['Goat', 'Grape', 'Girl', 'Game', 'Gate', 'Gift', 'Ghost', 'Giraffe', 'Glass', 'Grass', 'Guitar', 'Glove', 'Glue', 'Goose', 'Gold', 'Gorilla', 'Garden', 'Glasses'] },
  { letter: 'H', words: ['Hat', 'House', 'Horse', 'Hand', 'Heart', 'Hippo', 'Hammer', 'Hen', 'Helicopter', 'Honey', 'Hamburger', 'Hook', 'Helmet', 'Harp', 'Horn', 'Hill', 'Hair', 'Happy'] },
  { letter: 'I', words: ['Ice', 'Igloo', 'Island', 'Insect', 'Iron', 'Ink', 'Ice Cream', 'Idea', 'Iguana', 'Ivy', 'Invitation', 'Icicle', 'Instrument', 'Ill', 'Inch', 'Inside', 'Ironing', 'Imagine'] },
  { letter: 'J', words: ['Jelly', 'Jar', 'Jet', 'Juice', 'Jump', 'Jacket', 'Jeep', 'Jellyfish', 'Jewel', 'Juggler', 'Jam', 'Jigsaw', 'Jaguar', 'Judge', 'July', 'June', 'Jupiter', 'Joy'] },
  { letter: 'K', words: ['Kite', 'Key', 'King', 'Kangaroo', 'Koala', 'Kitchen', 'Keyboard', 'Kiwi', 'Kitten', 'Ketchup', 'Kick', 'Knee', 'Knife', 'Knot', 'Kazoo', 'Kayak', 'Karate', 'Kale'] },
  { letter: 'L', words: ['Lion', 'Lamp', 'Leaf', 'Lemon', 'Lock', 'Log', 'Ladybug', 'Ladder', 'Lip', 'Leg', 'Lizard', 'Lollipop', 'Lamb', 'Lunch', 'Lake', 'Lightning', 'Letter', 'Lighthouse'] },
  { letter: 'M', words: ['Monkey', 'Moon', 'Mouse', 'Milk', 'Man', 'Map', 'Mushroom', 'Magnet', 'Mitten', 'Mirror', 'Mask', 'Mountain', 'Music', 'Motorcycle', 'Muffin', 'Mermaid', 'Melon', 'Marker'] },
  { letter: 'N', words: ['Nest', 'Nose', 'Net', 'Nine', 'Nut', 'Necklace', 'Night', 'Nurse', 'Nail', 'Needle', 'Notebook', 'Newspaper', 'Napkin', 'Ninja', 'North', 'Noodle', 'Note', 'Narwhal'] },
  { letter: 'O', words: ['Octopus', 'Orange', 'Owl', 'Ocean', 'Onion', 'Ostrich', 'Oven', 'Oil', 'One', 'Overalls', 'Olive', 'Orchid', 'Otter', 'Ox', 'Oval', 'Ornament', 'Origami', 'Omelet'] },
  { letter: 'P', words: ['Pig', 'Pen', 'Pizza', 'Pan', 'Pumpkin', 'Panda', 'Piano', 'Plane', 'Pencil', 'Pear', 'Popcorn', 'Parrot', 'Penguin', 'Pirate', 'Potato', 'Pie', 'Pillow', 'Paint'] },
  { letter: 'Q', words: ['Queen', 'Quilt', 'Quarter', 'Quiet', 'Question', 'Quack', 'Quail', 'Quartz', 'Quill', 'Queue', 'Quick', 'Quiz', 'Quiver', 'Quote', 'Quad', 'Quest', 'Quake', 'Quinoa'] },
  { letter: 'R', words: ['Rabbit', 'Rainbow', 'Robot', 'Rose', 'Ring', 'Rain', 'Rocket', 'Rat', 'Radio', 'Road', 'Rug', 'Ruler', 'Rock', 'Raccoon', 'Rooster', 'River', 'Roof', 'Red'] },
  { letter: 'S', words: ['Sun', 'Snake', 'Star', 'Sock', 'Spoon', 'Snow', 'Spider', 'Ship', 'Shoe', 'Sheep', 'Shark', 'Strawberry', 'Sandwich', 'Slide', 'Swing', 'Scissors', 'Soap', 'School'] },
  { letter: 'T', words: ['Turtle', 'Tree', 'Tiger', 'Train', 'Table', 'Tomato', 'Tent', 'Truck', 'Toy', 'Toad', 'Tooth', 'Telephone', 'Television', 'Taco', 'Turkey', 'Tractor', 'Tie', 'Towel'] },
  { letter: 'U', words: ['Umbrella', 'Unicorn', 'Up', 'Underwear', 'Uniform', 'Umpire', 'Urchin', 'Ukulele', 'Urn', 'UFO', 'Utensil', 'Universe', 'Unhappy', 'Unlock', 'Unicycle', 'Upside', 'United', 'User'] },
  { letter: 'V', words: ['Van', 'Violin', 'Vase', 'Vegetable', 'Volcano', 'Vest', 'Vacuum', 'Vulture', 'Valentine', 'Village', 'Vine', 'Video', 'Valley', 'Vet', 'Violet', 'Vote', 'Voice', 'Vanilla'] },
  { letter: 'W', words: ['Whale', 'Water', 'Watch', 'Wagon', 'Wolf', 'Window', 'Web', 'Worm', 'Wheel', 'Wind', 'Witch', 'Waffle', 'Wallet', 'Wall', 'Wing', 'Wand', 'Wood', 'World'] },
  { letter: 'X', words: ['Xylophone', 'X-ray', 'Xenops', 'Xerus', 'Xmas', 'Box', 'Fox', 'Six', 'Mix', 'Wax', 'Fix', 'Axe', 'Taxi', 'Exit', 'Text', 'T-Rex', 'Ox', 'Lynx'] }, // Mixed containing X for phonetic utility
  { letter: 'Y', words: ['Yo-yo', 'Yak', 'Yarn', 'Yellow', 'Yacht', 'Yogurt', 'Yawn', 'Yard', 'Yolk', 'Yes', 'Year', 'Yell', 'Yam', 'Yoga', 'Young', 'Yesterday', 'Yucca', 'Yummy'] },
  { letter: 'Z', words: ['Zebra', 'Zoo', 'Zipper', 'Zero', 'Zigzag', 'Zombie', 'Zucchini', 'Zone', 'Zeppelin', 'Zoom', 'Zinc', 'Zest', 'Zap', 'Zephyr', 'Zen', 'Zodiac', 'Zookeeper', 'Zebra Fish'] },
];

// --- COMPONENTS ---

const Header = ({ goHome, mode }) => (
  <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10 pointer-events-none">
    <button 
      onClick={goHome} 
      className="pointer-events-auto bg-white/90 p-3 rounded-full shadow-lg hover:scale-110 transition-transform text-rose-500 border-4 border-rose-200"
    >
      <Home size={32} strokeWidth={3} />
    </button>
    <div className="bg-white/90 px-6 py-2 rounded-full shadow-lg border-4 border-yellow-300">
      <h2 className="text-2xl font-black text-slate-700 tracking-wider uppercase">{mode}</h2>
    </div>
  </div>
);

// --- READ MODE ---
const ReadMode = ({ goBack }) => {
  const [letterIndex, setLetterIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(-1); // -1 means showing just the Letter
  const [ttsSpeed, setTtsSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const currentData = ALPHABET_DATA[letterIndex];
  const isLetterView = wordIndex === -1;
  const content = isLetterView ? currentData.letter : currentData.words[wordIndex];

  // Speech Function
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = ttsSpeed;
      utterance.pitch = 1.2; // Slightly higher pitch for kids
      utterance.volume = 1;
      
      // Try to find a nice English voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.includes('en-US') && !v.name.includes('Microsoft')) || voices[0];
      if (preferredVoice) utterance.voice = preferredVoice;

      setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Auto-speak when content changes (optional, but requested "text to speech now read that word")
  useEffect(() => {
    // Only auto-speak if it's not the initial mount to avoid startling
    // But for a kid's app, click-to-play is often better for control. 
    // We will stick to button trigger as primary, but user asked for "text to speech NOW read that word" when showed.
    const timer = setTimeout(() => {
      speak(content);
    }, 500);
    return () => clearTimeout(timer);
  }, [content, letterIndex, wordIndex]);

  const handleNext = () => {
    if (wordIndex < 17) {
      setWordIndex(prev => prev + 1);
    } else {
      // Loop back to letter or go to next letter? Let's loop words or go to next letter hint
      handleNextLetter();
    }
  };

  const handlePrev = () => {
    if (wordIndex > -1) {
      setWordIndex(prev => prev - 1);
    }
  };

  const handleNextLetter = () => {
    setWordIndex(-1);
    setLetterIndex(prev => (prev + 1) % 26);
  };

  const handlePrevLetter = () => {
    setWordIndex(-1);
    setLetterIndex(prev => (prev === 0 ? 25 : prev - 1));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-300 to-indigo-400 p-4 pt-20">
      <Header goHome={goBack} mode="Read & Learn" />

      {/* Main Card */}
      <div className="relative group w-full max-w-lg aspect-square bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center border-8 border-white overflow-hidden transition-all duration-300 transform hover:scale-[1.02]">
        
        {/* Decorative Background Blobs inside card */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-50 -mr-10 -mt-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-50 -ml-10 -mb-10 animate-pulse delay-700"></div>

        {/* The Text Content */}
        <div 
          className={`z-10 text-center font-black text-slate-800 transition-all duration-500 cursor-pointer ${isPlaying ? 'scale-110 text-rose-500' : ''}`}
          onClick={() => speak(content)}
        >
          <span className={`${isLetterView ? 'text-[12rem] leading-none' : 'text-6xl md:text-7xl break-all'}`}>
            {content}
          </span>
          {!isLetterView && (
             <div className="text-3xl mt-4 text-slate-400 font-bold uppercase tracking-widest">{currentData.letter} is for...</div>
          )}
        </div>

        {/* Audio Visualizer (Simple CSS Animation) */}
        {isPlaying && (
          <div className="absolute bottom-12 flex gap-1 h-8 items-end">
             {[...Array(5)].map((_, i) => (
               <div key={i} className="w-2 bg-rose-400 rounded-full animate-bounce" style={{ height: '100%', animationDuration: `${0.4 + i * 0.1}s` }}></div>
             ))}
          </div>
        )}
      </div>

      {/* Speed Control */}
      <div className="w-full max-w-lg mt-8 bg-white/20 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 border border-white/30">
        <span className="text-2xl">🐢</span>
        <input 
          type="range" 
          min="0.5" 
          max="1.5" 
          step="0.1" 
          value={ttsSpeed} 
          onChange={(e) => setTtsSpeed(e.target.value)}
          className="w-full h-4 bg-white/50 rounded-full appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500"
        />
        <span className="text-2xl">🐇</span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mt-6 justify-center w-full max-w-2xl">
        
        {/* Skip Letter Back */}
        <button onClick={handlePrevLetter} className="bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-2xl shadow-lg border-b-4 border-indigo-700 active:border-b-0 active:translate-y-1 transition-all">
           <SkipForward className="rotate-180" size={24} />
        </button>

        {/* Previous Word/State */}
        {(!isLetterView) && (
          <button onClick={handlePrev} className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-4 rounded-2xl shadow-lg border-b-4 border-orange-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2 font-bold text-lg">
            <ArrowLeft size={24} strokeWidth={3} /> Prev
          </button>
        )}

        {/* Play Button */}
        <button 
          onClick={() => speak(content)} 
          className="bg-green-400 hover:bg-green-500 text-white px-8 py-4 rounded-2xl shadow-[0_10px_20px_rgba(74,222,128,0.4)] border-b-4 border-green-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2 font-bold text-2xl mx-2"
        >
          <Play size={32} fill="currentColor" /> Play
        </button>

        {/* Next Word/State */}
        <button onClick={handleNext} className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-4 rounded-2xl shadow-lg border-b-4 border-blue-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2 font-bold text-lg">
           Next <ArrowRight size={24} strokeWidth={3} />
        </button>

        {/* Skip Letter Forward */}
        <button onClick={handleNextLetter} className="bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-2xl shadow-lg border-b-4 border-indigo-700 active:border-b-0 active:translate-y-1 transition-all">
           <SkipForward size={24} />
        </button>
      </div>
      
      <div className="text-white/80 mt-4 font-bold tracking-wider">
        Letter {letterIndex + 1} of 26
      </div>
    </div>
  );
};

// --- WRITE MODE ---
const WriteMode = ({ goBack }) => {
  const [letterIndex, setLetterIndex] = useState(0);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ef4444'); // Default Red
  const [brushSize, setBrushSize] = useState(12);

  const currentLetter = ALPHABET_DATA[letterIndex].letter;

  const startDraw = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Resize canvas logic
  useEffect(() => {
    const canvas = canvasRef.current;
    // Set actual canvas size to match display size for crispness
    const resize = () => {
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        clearCanvas(); // Clear on resize
    }
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [letterIndex]); // Clear when letter changes

  return (
    <div className="flex flex-col items-center min-h-screen bg-amber-50 p-4 pt-20">
      <Header goHome={goBack} mode="Trace & Write" />

      <div className="flex items-center gap-6 mb-4 w-full max-w-2xl justify-between px-4">
        <button onClick={() => setLetterIndex(p => p === 0 ? 25 : p - 1)} className="p-3 bg-white rounded-full shadow-md hover:bg-slate-100">
          <ArrowLeft size={32} className="text-slate-600"/>
        </button>
        <h2 className="text-4xl font-black text-slate-700">Let's write: <span className="text-rose-500">{currentLetter}</span></h2>
        <button onClick={() => setLetterIndex(p => (p + 1) % 26)} className="p-3 bg-white rounded-full shadow-md hover:bg-slate-100">
          <ArrowRight size={32} className="text-slate-600"/>
        </button>
      </div>

      <div className="relative w-full max-w-lg aspect-[4/3] bg-white rounded-3xl shadow-xl border-8 border-amber-200 overflow-hidden cursor-crosshair touch-none">
        {/* Background Trace Letter */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <span className="text-[18rem] font-sans font-bold text-slate-100" style={{ fontFamily: 'Arial, sans-serif' }}>
            {currentLetter}
          </span>
        </div>
        
        {/* Canvas */}
        <div className="w-full h-full relative z-10">
            <canvas
            ref={canvasRef}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={endDraw}
            className="w-full h-full"
            />
        </div>
      </div>

      {/* Tools */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center items-center max-w-2xl bg-white p-4 rounded-2xl shadow-lg">
        {/* Colors */}
        <div className="flex gap-2 mr-4 border-r pr-4 border-slate-200">
          {['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#000000'].map(c => (
            <button 
              key={c}
              onClick={() => setColor(c)}
              className={`w-10 h-10 rounded-full border-4 transition-transform hover:scale-110 ${color === c ? 'border-slate-800 scale-110' : 'border-transparent'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <button 
            onClick={clearCanvas} 
            className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-500 transition-colors"
          >
            <div className="p-2 bg-slate-100 rounded-lg"><Trash2 size={24} /></div>
            <span className="text-xs font-bold">Clear</span>
          </button>

          <button 
            onClick={() => setColor('#ffffff')} // Eraser is just white paint
            className={`flex flex-col items-center gap-1 transition-colors ${color === '#ffffff' ? 'text-blue-500' : 'text-slate-500'}`}
          >
             <div className={`p-2 rounded-lg ${color === '#ffffff' ? 'bg-blue-100' : 'bg-slate-100'}`}><Eraser size={24} /></div>
             <span className="text-xs font-bold">Eraser</span>
          </button>
        </div>
      </div>
      
      <div className="mt-4 text-slate-400 font-bold">
         Use your finger or mouse to trace the letter!
      </div>
    </div>
  );
};


// --- HOME SCREEN ---
const HomeView = ({ onStart }) => (
  <div className="min-h-screen bg-yellow-300 flex flex-col items-center justify-center p-4 overflow-hidden relative">
    {/* Animated Background Elements */}
    <div className="absolute top-10 left-10 text-yellow-400 opacity-50 animate-bounce delay-1000"><Star size={64} fill="currentColor" /></div>
    <div className="absolute bottom-20 right-10 text-orange-300 opacity-50 animate-bounce"><Star size={96} fill="currentColor" /></div>
    <div className="absolute top-1/2 left-[-2rem] w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
    <div className="absolute top-1/2 right-[-2rem] w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

    <div className="z-10 text-center mb-12">
      <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.2)] tracking-tight mb-4">
        Kids<span className="text-sky-500">Learn</span>
      </h1>
      <p className="text-2xl text-yellow-800 font-bold">Ready to become a superstar?</p>
    </div>

    <div className="z-10 flex flex-col md:flex-row gap-8 w-full max-w-3xl justify-center">
      <button 
        onClick={() => onStart('read')}
        className="group relative flex-1 bg-white hover:bg-sky-50 p-8 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-b-8 border-sky-200 active:border-b-0 active:translate-y-2 transition-all duration-200 flex flex-col items-center gap-4"
      >
        <div className="bg-sky-100 p-6 rounded-full group-hover:scale-110 transition-transform duration-300">
           <BookOpen size={64} className="text-sky-500" />
        </div>
        <span className="text-4xl font-black text-slate-700">READ</span>
        <span className="text-slate-400 font-bold">Learn A-Z</span>
      </button>

      <button 
        onClick={() => onStart('write')}
        className="group relative flex-1 bg-white hover:bg-rose-50 p-8 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-b-8 border-rose-200 active:border-b-0 active:translate-y-2 transition-all duration-200 flex flex-col items-center gap-4"
      >
        <div className="bg-rose-100 p-6 rounded-full group-hover:scale-110 transition-transform duration-300">
           <Pencil size={64} className="text-rose-500" />
        </div>
        <span className="text-4xl font-black text-slate-700">WRITE</span>
        <span className="text-slate-400 font-bold">Trace & Draw</span>
      </button>
    </div>
    
    <div className="absolute bottom-4 text-yellow-600/50 text-sm font-bold">
      Made for fun learning!
    </div>
  </div>
);

// --- MAIN APP ---
export default function App() {
  const [view, setView] = useState('home'); // home, read, write

  return (
    <div className="font-sans select-none">
      {view === 'home' && <HomeView onStart={setView} />}
      {view === 'read' && <ReadMode goBack={() => setView('home')} />}
      {view === 'write' && <WriteMode goBack={() => setView('home')} />}
      
      {/* Global CSS adjustments for kids UI */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}