// app/catalog/page.tsx - ПОЛНЫЙ ИСПРАВЛЕННЫЙ КОД
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Filter, X, ShoppingCart, Star, ChevronLeft, RotateCcw } from 'lucide-react';

// Создаем простую корзину прямо здесь, чтобы избежать ошибок
interface CartItem {
  id: number;
  name: string;
  category: 'perfume' | 'car' | 'diffuser';
  price: number;
  ml: number;
  quantity: number;
  image: string;
  notes: string[];
}

class SimpleCart {
  private items: CartItem[] = [];
  private listeners: (() => void)[] = [];

  addItem(item: Omit<CartItem, 'quantity'>) {
    const existing = this.items.find(i => i.id === item.id && i.ml === item.ml);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
    
    this.saveToStorage();
    this.notifyListeners();
  }

  removeItem(id: number, ml: number) {
    this.items = this.items.filter(item => !(item.id === id && item.ml === ml));
    this.saveToStorage();
    this.notifyListeners();
  }

  updateQuantity(id: number, ml: number, quantity: number) {
    const item = this.items.find(i => i.id === id && i.ml === ml);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(id, ml);
      }
    }
    this.saveToStorage();
    this.notifyListeners();
  }

  clearCart() {
    this.items = [];
    this.saveToStorage();
    this.notifyListeners();
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getItemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('elruh-cart', JSON.stringify(this.items));
    }
  }

  loadFromStorage() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('elruh-cart');
      if (saved) {
        try {
          this.items = JSON.parse(saved);
          this.notifyListeners();
        } catch (error) {
          console.error('Error loading cart:', error);
          this.items = [];
        }
      }
    }
  }
}

const cart = new SimpleCart();

const CatalogPage = () => {
  const [selectedPerfume, setSelectedPerfume] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedVolume, setSelectedVolume] = useState<{[key: number]: number}>({});
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [itemCount, setItemCount] = useState(0);

  // Категории
  const categories = [
    { id: 'all', name: 'Все товары' },
    { id: 'perfumes', name: 'Масляные духи' },
    { id: 'car', name: 'Автоароматы' },
    { id: 'diffusers', name: 'Диффузоры' },
  ];

  // Масляные духи (5-100мл)
  const perfumes = [
    {
      id: 1,
      name: "OUD ROYAL",
      category: "perfumes",
      description: "Царственный уд, обрамленный шафраном и таинственным пачули",
      fullDescription: "Композиция на основе редкого вьетнамского уда, выдержанного 15 лет. Верхние ноты шафрана и бергамота, сердце — уд и роза, база — пачули и сандал. Стойкость 24+ часов.",
      similarTo: "Tom Ford Oud Wood, Maison Francis Kurkdjian Oud Satin Mood",
      price: 8900,
      notes: ["Уд", "Шафран", "Сандал", "Амбра", "Пачули", "Бергамот"],
      rating: 5,
      volumeOptions: [
        { ml: 5, price: 4500 },
        { ml: 10, price: 7200 },
        { ml: 15, price: 8900 },
        { ml: 30, price: 16500 },
        { ml: 50, price: 25000 },
        { ml: 100, price: 45000 },
      ],
      image: "https://i.pinimg.com/1200x/1f/73/f2/1f73f2e9df5717612bd882ecb2afdc2c.jpg",
    },
    {
      id: 2,
      name: "ROSE NOIRE",
      category: "perfumes",
      description: "Темная роза в обрамлении пачули и ванили",
      fullDescription: "Турецкая роза и марокканская роза в сочетании с пачули из Индонезии. Сладкая ваниль и мускус создают шлейф, который держится 24+ часов. Идеальный вечерний аромат.",
      similarTo: "Portrait of a Lady Frederic Malle, Noir de Noir Tom Ford",
      price: 7500,
      notes: ["Роза", "Пачули", "Ваниль", "Мускус", "Бергамот", "Иланг"],
      rating: 4,
      volumeOptions: [
        { ml: 5, price: 3800 },
        { ml: 10, price: 6000 },
        { ml: 15, price: 7500 },
        { ml: 30, price: 14000 },
        { ml: 50, price: 22000 },
        { ml: 100, price: 40000 },
      ],
      image: "https://i.pinimg.com/736x/bb/e3/6d/bbe36d8d141c4305d6bab2f4bdd83b93.jpg",
    },
    {
      id: 3,
      name: "SANDALWOOD",
      category: "perfumes",
      description: "Чистый сандал, согретый амброй",
      fullDescription: "Используется сандал из Майсура, выдержанный 10 лет. Амбра высшего качества и мускус создают теплую, обволакивающую композицию. Медитативный и уютный аромат.",
      similarTo: "Le Labo Santal 33, Tam Dao Diptyque",
      price: 8200,
      notes: ["Сандал", "Амбра", "Мускус", "Кедр", "Ваниль", "Пачули"],
      rating: 5,
      volumeOptions: [
        { ml: 5, price: 4100 },
        { ml: 10, price: 6600 },
        { ml: 15, price: 8200 },
        { ml: 30, price: 15500 },
        { ml: 50, price: 24000 },
        { ml: 100, price: 43000 },
      ],
      image: "https://i.pinimg.com/736x/16/b7/16/16b716526b62801620b4ec87fb8b7a34.jpg",
    },
    {
      id: 4,
      name: "AMBER OUD",
      category: "perfumes",
      description: "Глубокий янтарь и редкий уд",
      fullDescription: "Комбинация серой амбры и лаодского уда. Роскошный и сложный аромат для истинных ценителей. Идеальный выбор для особых случаев и вечерних выходов.",
      similarTo: "Ambre Sultan Serge Lutens, Amber Absolute Tom Ford",
      price: 9500,
      notes: ["Амбра", "Уд", "Ваниль", "Ладан", "Пачули", "Сандал"],
      rating: 5,
      volumeOptions: [
        { ml: 5, price: 4800 },
        { ml: 10, price: 7600 },
        { ml: 15, price: 9500 },
        { ml: 30, price: 18000 },
        { ml: 50, price: 28000 },
        { ml: 100, price: 50000 },
      ],
      image: "https://i.pinimg.com/736x/47/db/ab/47dbabb18ba2d7f44b5b9e1927623367.jpg",
    },
    {
      id: 5,
      name: "JASMIN NUIT",
      category: "perfumes",
      description: "Ночной жасмин и тубероза",
      fullDescription: "Абсолют жасмина из Грасса и тубероза из Индии. Цветочная симфония, которая раскрывается в ночное время. Чувственный и загадочный аромат.",
      similarTo: "Carnal Flower Frederic Malle, Jasmin des Anges Dior",
      price: 7800,
      notes: ["Жасмин", "Тубероза", "Иланг", "Мускус", "Ваниль", "Кокос"],
      rating: 4,
      volumeOptions: [
        { ml: 5, price: 3900 },
        { ml: 10, price: 6200 },
        { ml: 15, price: 7800 },
        { ml: 30, price: 14500 },
        { ml: 50, price: 23000 },
        { ml: 100, price: 42000 },
      ],
      image: "https://i.pinimg.com/736x/0a/d5/82/0ad5825cf5b3082d50021b694ecbb6fe.jpg",
    },
    {
      id: 6,
      name: "VETIVER ROYAL",
      category: "perfumes",
      description: "Благородный ветивер и дубовый мох",
      fullDescription: "Гаитянский ветивер высшего качества в сочетании с дубовым мхом. Свежий, землистый, сложный аромат для уверенных в себе мужчин и женщин.",
      similarTo: "Vetiver Extraordinaire Frederic Malle, Sycomore Chanel",
      price: 8400,
      notes: ["Ветивер", "Дубовый мох", "Герань", "Бергамот", "Нероли", "Мускус"],
      rating: 5,
      volumeOptions: [
        { ml: 5, price: 4200 },
        { ml: 10, price: 6700 },
        { ml: 15, price: 8400 },
        { ml: 30, price: 16000 },
        { ml: 50, price: 25000 },
        { ml: 100, price: 44000 },
      ],
      image: "https://i.pinimg.com/736x/b9/e0/5e/b9e05e5dea03c927901707b888f51a6f.jpg",
    },
  ];

  // Автоароматы (5-10мл)
  const carPerfumes = [
    {
      id: 101,
      name: "FRESH CITRUS",
      category: "car",
      description: "Свежий цитрусовый аромат для авто",
      fullDescription: "Бодрящая композиция из итальянского лимона, бергамота и мяты. Освежает воздух в салоне, устраняет неприятные запахи, повышает концентрацию за рулем.",
      similarTo: "Освежитель воздуха с цитрусовыми нотами",
      price: 1200,
      notes: ["Лимон", "Бергамот", "Мята", "Грейпфрут", "Имбирь"],
      rating: 5,
      volumeOptions: [
        { ml: 5, price: 1200 },
        { ml: 10, price: 2000 },
      ],
      image: "https://i.pinimg.com/1200x/fb/a2/b0/fba2b03156cf5ebf284e55537ea2ebcb.jpg",
    },
    {
      id: 102,
      name: "OCEAN BREEZE",
      category: "car",
      description: "Морская свежесть и бриз",
      fullDescription: "Аква-аромат с нотами морского бриза, водорослей и свежего белья. Создает ощущение чистоты и свежести в салоне автомобиля.",
      similarTo: "Davidoff Cool Water, Acqua di Gio",
      price: 1100,
      notes: ["Морская свежесть", "Водоросли", "Жасмин", "Мускус", "Амбра"],
      rating: 4,
      volumeOptions: [
        { ml: 5, price: 1100 },
        { ml: 10, price: 1900 },
      ],
      image: "https://i.pinimg.com/1200x/c7/9b/60/c79b60e183f77a85005e3e44694491a3.jpg",
    },
    {
      id: 103,
      name: "LEATHER LUXURY",
      category: "car",
      description: "Аромат новой кожи и дерева",
      fullDescription: "Роскошная композиция, имитирующая запах новой кожи салона премиального автомобиля с нотками дерева и табака.",
      similarTo: "Запах нового автомобиля премиум-класса",
      price: 1500,
      notes: ["Кожа", "Дерево", "Табак", "Ваниль", "Пачули"],
      rating: 5,
      volumeOptions: [
        { ml: 5, price: 1500 },
        { ml: 10, price: 2500 },
      ],
      image: "https://i.pinimg.com/736x/54/e5/98/54e5980a9e01a3f44b7b5c40aee2a1b0.jpg",
    },
    {
      id: 104,
      name: "VANILLA DREAM",
      category: "car",
      description: "Сладкая ваниль и корица",
      fullDescription: "Уютный сладкий аромат мадагаскарской ванили с теплыми нотами корицы и карамели. Создает домашнюю атмосферу в автомобиле.",
      similarTo: "Пряничный аромат",
      price: 1300,
      notes: ["Ваниль", "Корица", "Карамель", "Мускатный орех", "Амбра"],
      rating: 4,
      volumeOptions: [
        { ml: 5, price: 1300 },
        { ml: 10, price: 2200 },
      ],
      image: "https://i.pinimg.com/736x/34/3a/36/343a363b4d4f0b50ef84e8a191263804.jpg",
    },
  ];

  // Диффузоры для дома (50-200мл)
  const diffusers = [
    {
      id: 201,
      name: "HOME SANCTUARY",
      category: "diffusers",
      description: "Уютный аромат для дома",
      fullDescription: "Теплая и уютная композиция для создания атмосферы гармонии и уюта в доме. Идеально подходит для гостиной и спальни.",
      similarTo: "Домашний уютный аромат",
      price: 3500,
      notes: ["Сандал", "Ваниль", "Корица", "Амбра", "Мускус"],
      rating: 5,
      volumeOptions: [
        { ml: 50, price: 3500 },
        { ml: 100, price: 6000 },
        { ml: 200, price: 11000 },
      ],
      image: "https://i.pinimg.com/1200x/f5/c0/50/f5c05096312795249257e05143e1cef2.jpg",
    },
    {
      id: 202,
      name: "SPA RELAX",
      category: "diffusers",
      description: "Расслабляющий спа-аромат",
      fullDescription: "Расслабляющая композиция с нотами эвкалипта, лаванды и мяты. Создает атмосферу спа-салона, способствует релаксации.",
      similarTo: "Аромат спа-салона",
      price: 3200,
      notes: ["Эвкалипт", "Лаванда", "Мята", "Ромашка", "Кедр"],
      rating: 5,
      volumeOptions: [
        { ml: 50, price: 3200 },
        { ml: 100, price: 5500 },
        { ml: 200, price: 10000 },
      ],
      image: "https://i.pinimg.com/736x/d9/96/c6/d996c62d2f792298ad951f0e6fd38626.jpg",
    },
    {
      id: 203,
      name: "FRESH LINEN",
      category: "diffusers",
      description: "Свежесть чистого белья",
      fullDescription: "Чистый и свежий аромат, напоминающий запах только что постиранного белья. Освежает воздух, создает ощущение чистоты.",
      similarTo: "Запах свежего белья",
      price: 3000,
      notes: ["Свежесть", "Цитрус", "Ландыш", "Мускус", "Альдегиды"],
      rating: 4,
      volumeOptions: [
        { ml: 50, price: 3000 },
        { ml: 100, price: 5000 },
        { ml: 200, price: 9000 },
      ],
      image: "https://i.pinimg.com/1200x/bc/7a/00/bc7a007f740d65ab34a802512262f515.jpg",
    },
    {
      id: 204,
      name: "TEA GARDEN",
      category: "diffusers",
      description: "Зеленый чай и жасмин",
      fullDescription: "Нежный цветочно-зеленый аромат с нотами зеленого чая, жасмина и цитрусов. Освежает и бодрит, идеален для офиса.",
      similarTo: "Elizabeth Arden Green Tea",
      price: 3400,
      notes: ["Зеленый чай", "Жасмин", "Бергамот", "Цитрон", "Фиалка"],
      rating: 5,
      volumeOptions: [
        { ml: 50, price: 3400 },
        { ml: 100, price: 5800 },
        { ml: 200, price: 10500 },
      ],
      image: "https://i.pinimg.com/1200x/2d/b1/fe/2db1fef7b6460662b2ba8ad16ed4cea4.jpg",
    },
  ];

  // Все товары
  const allProducts = [...perfumes, ...carPerfumes, ...diffusers];

  // Фильтрация по категории
  const filteredProducts = activeCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === activeCategory);

  useEffect(() => {
    cart.loadFromStorage();
    const unsubscribe = cart.subscribe(() => {
      setCartItems(cart.getItems());
      setItemCount(cart.getItemCount());
    });
    setCartItems(cart.getItems());
    setItemCount(cart.getItemCount());
    return unsubscribe;
  }, []);

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => 
      prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
    );
  };

  const addToCart = (productId: number) => {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    const volume = selectedVolume[productId] || product.volumeOptions[0].ml;
    const price = product.volumeOptions.find(v => v.ml === volume)?.price || product.price;
    
    cart.addItem({
      id: productId,
      name: product.name,
      category: product.category as 'perfume' | 'car' | 'diffuser',
      price: price,
      ml: volume,
      image: product.image,
      notes: product.notes,
    });
    
    setSelectedPerfume(null);
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-black/50 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Хлебные крошки */}
          <div className="mb-8">
            <Link href="/" className="text-gray-400 hover:text-gold flex items-center">
              <ChevronLeft size={18} className="mr-2" />
              На главную
            </Link>
          </div>

          {/* Заголовок и фильтры */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 font-elegant">Каталог</h1>
              <p className="text-gray-400">Эксклюзивные ароматы и аксессуары ручной работы</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="relative">
                <select 
                  className="bg-black/50 border border-gray-800 text-white px-4 py-2 rounded-lg appearance-none pr-10"
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              <Link href="/cart" className="flex items-center space-x-2 text-gray-400 hover:text-gold">
                <ShoppingCart className="text-gold" />
                <span>Корзина ({itemCount})</span>
              </Link>
            </div>
          </div>

          {/* Категории */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  activeCategory === category.id
                    ? 'bg-gold text-black font-semibold'
                    : 'bg-black/50 border border-gray-800 text-gray-300 hover:border-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Сетка товаров */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="relative h-[500px] cursor-pointer group"
                onClick={() => toggleFlip(product.id)}
              >
                {/* Карточка - лицевая сторона */}
                <div className={`absolute inset-0 bg-gradient-to-b from-gray-900 to-black border border-gray-800 transition-all duration-500 ${
                  flippedCards.includes(product.id) ? 'opacity-0 rotate-y-180' : 'opacity-100'
                }`}>
                  <div className="h-64 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-black/80 text-gold px-3 py-1 text-sm font-semibold rounded">
                        {product.category === 'perfumes' ? 'Духи' : 
                         product.category === 'car' ? 'Авто' : 'Диффузор'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${i < product.rating ? 'text-gold fill-gold' : 'text-gray-700'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gold">{product.price.toLocaleString()} ₽</div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-6">{product.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.notes.slice(0, 3).map((note, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-black text-gray-300 text-xs border border-gray-800"
                        >
                          {note}
                        </span>
                      ))}
                      {product.notes.length > 3 && (
                        <span className="px-3 py-1 bg-black text-gray-500 text-xs border border-gray-800">
                          +{product.notes.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-center text-gray-500 text-sm mt-4">
                      Нажмите для подробной информации →
                    </div>
                  </div>
                </div>

                {/* Карточка - обратная сторона */}
                <div className={`absolute inset-0 bg-gradient-to-b from-black to-gray-900 border border-gold/30 p-6 transition-all duration-500 ${
                  flippedCards.includes(product.id) ? 'opacity-100' : 'opacity-0 rotate-y-180'
                } overflow-y-auto`}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gold">{product.name}</h3>
                      <span className="text-gray-400 text-sm">
                        {product.category === 'perfumes' ? 'Масляные духи' : 
                         product.category === 'car' ? 'Автоаромат' : 'Диффузор для дома'}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlip(product.id);
                      }}
                      className="text-gray-400 hover:text-white"
                    >
                      <RotateCcw size={20} />
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-2">Полное описание:</h4>
                    <p className="text-gray-300 text-sm">{product.fullDescription}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-2">Похож на:</h4>
                    <p className="text-gray-300 text-sm">{product.similarTo}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Выберите объем:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {product.volumeOptions.map((option, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVolume({
                              ...selectedVolume,
                              [product.id]: option.ml
                            });
                          }}
                          className={`p-3 border text-center transition-colors ${
                            selectedVolume[product.id] === option.ml
                              ? 'border-gold bg-gold/10 text-gold'
                              : 'border-gray-800 text-gray-400 hover:border-gray-700'
                          }`}
                        >
                          <div className="font-bold">{option.ml} мл</div>
                          <div className="text-lg mt-1">{option.price.toLocaleString()} ₽</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-2">Ноты аромата:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.notes.map((note, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-black text-gray-300 border border-gray-800 text-sm"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product.id);
                    }}
                    className="w-full py-3 bg-gold text-black font-bold hover:bg-yellow-600 transition-colors"
                  >
                    Добавить в корзину за {
                      (selectedVolume[product.id] 
                        ? product.volumeOptions.find(v => v.ml === selectedVolume[product.id])?.price 
                        : product.volumeOptions[0].price
                      )?.toLocaleString()
                    } ₽
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Информация о категориях */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/50 border border-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4 font-elegant">Масляные духи</h3>
              <p className="text-gray-400 mb-4">Концентрированные аттары ручной работы из натуральных масел. Стойкость 8-24 часа.</p>
              <div className="text-gold text-sm">
                Объемы: 5мл, 10мл, 15мл, 30мл, 50мл, 100мл
              </div>
            </div>
            
            <div className="bg-black/50 border border-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4 font-elegant">Автоароматы</h3>
              <p className="text-gray-400 mb-4">Пахучки для машины с клипсой. Держатся 1-2 месяца. Легкая установка.</p>
              <div className="text-gold text-sm">
                Объемы: 5мл, 10мл • В комплекте клипса
              </div>
            </div>
            
            <div className="bg-black/50 border border-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4 font-elegant">Диффузоры</h3>
              <p className="text-gray-400 mb-4">Ароматы для дома и офиса. Работают 2-3 месяца. Элегантный дизайн.</p>
              <div className="text-gold text-sm">
                Объемы: 50мл, 100мл, 200мл • В комплекте тростинки
              </div>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="mt-12 bg-gradient-to-r from-black/50 to-gray-900/50 border border-gold/20 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-white mb-6 text-center font-elegant">Как выбрать объем?</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl text-gold mb-2">5-10мл</div>
                <p className="text-gray-300 text-sm">Для пробы аромата или в подарок</p>
              </div>
              <div className="text-center">
                <div className="text-3xl text-gold mb-2">15-30мл</div>
                <p className="text-gray-300 text-sm">Оптимально для регулярного использования</p>
              </div>
              <div className="text-center">
                <div className="text-3xl text-gold mb-2">50-100мл</div>
                <p className="text-gray-300 text-sm">Для постоянных покупателей (выгоднее)</p>
              </div>
              <div className="text-center">
                <div className="text-3xl text-gold mb-2">200мл</div>
                <p className="text-gray-300 text-sm">Для диффузоров (хватает на 3 месяца)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default CatalogPage;