// ============================================
// وظائف التفاعل الجديدة
// ============================================

// 1. التبديل بين القائمة والهاتف
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// 2. زر البدء في القسم الرئيسي
const heroBtn = document.getElementById('heroBtn');
heroBtn.addEventListener('click', () => {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
    showNotification('🌊 مرحباً بك في رحلة أملج الساحرة!');
});

// 3. دالة عرض الإشعارات
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 4. تأثير العد التصاعدي للإحصائيات
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue);
                
                if (!isNaN(numericValue)) {
                    let current = 0;
                    const increment = numericValue / 50;
                    
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= numericValue) {
                            target.textContent = finalValue;
                            clearInterval(counter);
                        } else {
                            target.textContent = Math.floor(current) + (finalValue.includes('+') ? '+' : '');
                        }
                    }, 30);
                }
                
                target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// 5. تأثير الظهور عند التمرير
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .activity-item, .testimonial-card, .contact-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// 6. تأثير التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 7. تأثير عند تحريك الماوس على بطاقات المعرض
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// 8. تأثير عند تحريك الماوس على البطاقات
document.querySelectorAll('.feature-card, .contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// 9. معالج تغيير حجم النافذة
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// 10. تأثير الخلفية عند التمرير
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// 11. إضافة تأثيرات CSS ديناميكية
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// 12. تتبع الأداء
function trackPageLoad() {
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`⏱️ وقت تحميل الصفحة: ${loadTime}ms`);
    });
}

// 13. معالج الأخطاء
window.addEventListener('error', (event) => {
    console.error('❌ خطأ:', event.error);
});

// 14. إضافة رسالة ترحيب في وحدة التحكم
console.log('%c🌊 مرحباً بك في مدينة أملج 🌊', 'color: #2ecc71; font-size: 18px; font-weight: bold;');
console.log('%cمالديف المملكة العربية السعودية', 'color: #1a472a; font-size: 16px; font-style: italic;');
console.log('%c✨ استمتع برحلة ساحرة في أملج الخلابة ✨', 'color: #e74c3c; font-size: 14px;');

// 15. تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    addDynamicStyles();
    observeElements();
    animateStats();
    trackPageLoad();
});

// 16. تأثير إضافي: تغيير لون الشريط العلوي عند التمرير
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    }
});

// 17. دالة إضافية: تفعيل الأنشطة عند النقر
document.querySelectorAll('.activity-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        showNotification(`🎯 نشاط ${index + 1}: جاهز للبدء!`);
    });
});

// 18. دالة إضافية: تفعيل الشهادات
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('click', () => {
        const text = card.querySelector('.testimonial-text').textContent;
        showNotification('⭐ شكراً على تقييمك!');
    });
});
