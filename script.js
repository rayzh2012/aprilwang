// 初始化AOS动画库
AOS.init({
    duration: 1000,
    once: true
});

// 首页滚动效果
function initHeroScroll() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    scrollIndicator.addEventListener('click', () => {
        const portfolioSection = document.querySelector('#portfolio');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// 导航栏滚动效果
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// 移动端菜单切换
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // 关闭移动端菜单
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// 加载动画
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// 作品集数据
const portfolioItems = [
    {
        title: "AI 创意海报系列",
        category: "ai",
        image: "./images/imgs/21a1b554a8e211971f79c7f66525e30.jpg",
        description: "使用 AI 技术创作的创意海报系列，融合了未来感与极简美学。",
        details: [
            "使用 Midjourney 和 Stable Diffusion 生成基础图像",
            "通过 PS 和 AE 进行后期处理和动态效果制作",
            "结合 C4D 制作 3D 元素，增强视觉层次感"
        ]
    },
    {
        title: "AI 动态插画设计",
        category: "ai",
        image: "./images/imgs/21a1b554a8e211971f79c7f66525e30.jpg",
        description: "结合 AI 与动态设计的插画作品，展现独特的视觉语言。",
        details: [
            "使用 AI 生成基础插画元素",
            "通过 AE 制作流畅的动画效果",
            "结合 PS 进行细节优化和调色"
        ]
    },
    {
        title: "智能家居控制器设计",
        category: "industrial",
        image: "./images/imgs/21a1b554a8e211971f79c7f66525e30.jpg",
        description: "现代简约风格的智能家居控制器设计，注重用户体验。",
        details: [
            "使用 C4D 进行 3D 建模和渲染",
            "通过 PS 制作产品展示图",
            "结合 AE 制作产品演示动画"
        ]
    },
    {
        title: "便携式咖啡机设计",
        category: "industrial",
        image: "./images/imgs/21a1b554a8e211971f79c7f66525e30.jpg",
        description: "创新便携式咖啡机设计，融合美学与实用性。",
        details: [
            "使用 C4D 进行产品建模",
            "通过 PS 制作产品效果图",
            "结合 AE 制作产品展示动画"
        ]
    },
    {
        title: "AI 品牌视觉系统",
        category: "ai",
        image: "./images/imgs/21a1b554a8e211971f79c7f66525e30.jpg",
        description: "基于 AI 技术的品牌视觉系统设计，展现未来感。",
        details: [
            "使用 AI 生成品牌元素",
            "通过 PS 进行视觉系统设计",
            "结合 AE 制作动态展示"
        ]
    },
    {
        title: "工业机器人外观设计",
        category: "industrial",
        image: "./images/imgs/21a1b554a8e211971f79c7f66525e30.jpg",
        description: "未来感工业机器人外观设计，强调科技感。",
        details: [
            "使用 C4D 进行 3D 建模",
            "通过 PS 制作产品效果图",
            "结合 AE 制作产品展示动画"
        ]
    }
];

// 预加载图片
function preloadImages() {
    portfolioItems.forEach(item => {
        const img = new Image();
        img.onerror = function() {
            // 如果图片加载失败，使用占位图
            this.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
        };
        img.src = item.image;
    });
}

// 作品集筛选功能
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter button');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            
            // 筛选作品
            const filteredItems = filter === 'all' 
                ? portfolioItems 
                : portfolioItems.filter(item => item.category === filter);

            // 清空并重新加载作品
            portfolioGrid.innerHTML = '';
            loadPortfolio(filteredItems);
        });
    });
}

// 加载作品集
function loadPortfolio(items = portfolioItems) {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    items.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-aos', 'fade-up');
        portfolioItem.setAttribute('data-aos-delay', index * 100);
        
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/800x600?text=Image+Not+Found'">
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <span class="category">${item.category === 'ai' ? 'AI 设计' : '工业设计'}</span>
                <p>${item.description}</p>
            </div>
        `;

        portfolioItem.addEventListener('click', () => showPortfolioModal(item));
        portfolioGrid.appendChild(portfolioItem);
    });
}

// 显示作品详情模态框
function showPortfolioModal(item) {
    const modal = document.querySelector('.portfolio-modal');
    const modalImage = modal.querySelector('.modal-image img');
    const modalTitle = modal.querySelector('.modal-info h3');
    const modalCategory = modal.querySelector('.modal-info .category');
    const modalDescription = modal.querySelector('.modal-info .description');
    const closeModal = modal.querySelector('.close-modal');

    // 更新模态框内容
    modalImage.src = item.image;
    modalImage.alt = item.title;
    modalTitle.textContent = item.title;
    modalCategory.textContent = item.category === 'ai' ? 'AI 设计' : '工业设计';
    modalDescription.innerHTML = `
        <p>${item.description}</p>
        <div class="project-details">
            <h4>项目详情</h4>
            <ul>
                ${item.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
        </div>
    `;

    // 显示模态框
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 添加动画效果
    modalImage.style.transform = 'scale(1.1)';
    setTimeout(() => {
        modalImage.style.transform = 'scale(1)';
    }, 100);
}

// 关闭模态框
function closePortfolioModal() {
    const modal = document.querySelector('.portfolio-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// 初始化模态框事件监听
function initPortfolioModal() {
    const modal = document.querySelector('.portfolio-modal');
    const closeModal = modal.querySelector('.close-modal');

    // 点击关闭按钮关闭
    closeModal.addEventListener('click', closePortfolioModal);

    // 点击模态框背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePortfolioModal();
        }
    });

    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closePortfolioModal();
        }
    });
}

// 粒子动画效果
class Particle {
    constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.originalX = x;
        this.originalY = y;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // 边界检查
        if (this.x < 0 || this.x > window.innerWidth) {
            this.speedX = -this.speedX;
        }
        if (this.y < 0 || this.y > window.innerHeight) {
            this.speedY = -this.speedY;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 168, 255, 0.2)';
        ctx.fill();
    }
}

function initParticles() {
    const canvas = document.querySelector('.particle-container canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;

    function resizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }

    function createParticles() {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 2 + 1;
            const speedX = Math.random() * 0.5 - 0.25;
            const speedY = Math.random() * 0.5 - 0.25;
            particles.push(new Particle(x, y, size, speedX, speedY));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });

        requestAnimationFrame(animate);
    }

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
}

// 首页背景点击效果
function initHeroBackground() {
    const hero = document.querySelector('.hero');
    let isBlurRemoved = false;

    hero.addEventListener('click', () => {
        isBlurRemoved = !isBlurRemoved;
        hero.classList.toggle('blur-removed');
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolio();
    initParticles();
    initPortfolioFilter();
    initPortfolioModal();
    initHeroBackground();
    initHeroScroll();
}); 