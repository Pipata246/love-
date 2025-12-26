// РОМАНТИЧЕСКАЯ ИНТЕРАКТИВНАЯ СТРАНИЦА
document.addEventListener('DOMContentLoaded', function() {
    console.log('Романтическая страница загружена! 💕');
    
    const mainHeart = document.getElementById('mainHeart');
    const memoryButtons = document.getElementById('memoryButtons');
    const romanticPhrase = document.getElementById('romanticPhrase');
    const memoryBtns = document.querySelectorAll('.memory-btn');
    
    let isActivated = false;
    
    // Романтические фразы для каждого воспоминания (показываются внизу)
    const romanticPhrases = {
    1: "Помнишь тот волшебный момент, когда наши глаза встретились? ❄️",
    2: "Наше первое свидание было как сказка... 🎄",
    3: "Тот первый поцелуй... время остановилось ⭐",
    4: "Каждое путешествие с тобой - новая история 🎁",
    5: "Мы мечтаем вместе, и это прекрасно 🌟",
    6: "Теплые вечера в твоих объятиях 🕯️",
    7: "Наши традиции делают нас ближе 🎊",
    8: "Ты моя опора в трудные моменты 🤗",
    9: "Наши безумные поступки незабываемы 🎉",
    10: "Будущее с тобой - лучшее приключение 🌨️"
};

    
    // Функция для расчета позиции кнопок по кругу - УВЕЛИЧЕННОЕ РАССТОЯНИЕ
    function positionMemoryButtons() {
        // Увеличенный радиус для большего расстояния между кнопками
        let radius = 150; // Увеличенный радиус
        
        if (window.innerWidth >= 1400) {
            radius = 170;
        } else if (window.innerWidth >= 1200) {
            radius = 160;
        } else if (window.innerWidth >= 1024) {
            radius = 150;
        } else if (window.innerWidth >= 768) {
            radius = 130;
        } else if (window.innerWidth >= 480) {
            radius = 110;
        } else {
            radius = 95;
        }
        
        memoryBtns.forEach((btn, index) => {
            const angle = (360 / memoryBtns.length) * index;
            const radian = (angle * Math.PI) / 180;
            
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;
            
            // Адаптивное смещение для центрирования
            const offset = window.innerWidth <= 480 ? 25 : 42;
            
            btn.style.left = `calc(50% + ${x}px - ${offset}px)`;
            btn.style.top = `calc(50% + ${y}px - ${offset}px)`;
            btn.dataset.angle = angle;
        });
    }
    
    // Инициализация позиций кнопок
    positionMemoryButtons();
    
    // Обработчик клика на главное сердце
    mainHeart.addEventListener('click', function() {
        if (!isActivated) {
            activateMemoryMenu();
        }
    });
    
    // Функция активации меню воспоминаний
    function activateMemoryMenu() {
        isActivated = true;
        
        // Скрываем подсказку про красное сердечко
        const redHeartHint = document.querySelector('.red-heart-hint');
        if (redHeartHint) {
            redHeartHint.classList.add('hidden');
        }
        
        // Анимация главного сердца - оно исчезает
        mainHeart.classList.add('activated');
        
        // Полностью скрываем главное сердце через 1 секунду
        setTimeout(() => {
            mainHeart.style.display = 'none';
        }, 1000);
        
        // Показываем кнопки воспоминаний с задержкой
        memoryBtns.forEach((btn, index) => {
            setTimeout(() => {
                btn.classList.add('show');
            }, index * 100 + 500); // Начинаем показывать после того как сердце начнет исчезать
        });
    }
    
    // Обработчики кликов на кнопки воспоминаний
    memoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const memoryId = this.dataset.memory;
            
            // Показываем романтическую фразу внизу
            showRomanticPhrase(memoryId);
            
            // Открываем модальное окно
            openMemoryModal(memoryId);
            
            // Анимация нажатой кнопки
            this.style.transform = 'scale(1.3) rotate(360deg)';
            this.style.background = 'linear-gradient(135deg, #1565c0, #1976d2)';
            
            // Возвращаем кнопку в исходное состояние
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(360deg)';
                this.style.background = 'linear-gradient(135deg, rgba(187, 222, 251, 0.9), rgba(144, 202, 249, 0.9))';
            }, 300);
        });
        
        // Эффект при наведении
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(360deg)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(360deg)';
        });
    });
    
    // Функция показа романтической фразы
    function showRomanticPhrase(memoryId) {
        // Убираем всплывающий текст - он больше не нужен
        // const phrase = romanticPhrases[memoryId];
        // romanticPhrase.textContent = phrase;
        // romanticPhrase.classList.add('show');
        
        // // Скрываем фразу через 3 секунды
        // setTimeout(() => {
        //     romanticPhrase.classList.remove('show');
        // }, 3000);
    }
    
    // Функция открытия модального окна воспоминания
    function openMemoryModal(memoryId) {
        const modal = document.getElementById(`memory-modal-${memoryId}`);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Функция закрытия модального окна
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Обработчики для кнопок закрытия модальных окон
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(function(closeBtn) {
        closeBtn.addEventListener('click', function() {
            const modal = closeBtn.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Закрытие по клику вне модального окна
    const modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="block"]');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
    
    // КАСТОМНЫЙ ПЛЕЕР
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const songNameDisplay = document.getElementById('songName');

    if (audioPlayer && playPauseBtn && volumeSlider) {
        let isPlaying = false;
        
        // Устанавливаем начальную громкость
        audioPlayer.volume = 0.5;
        
        // Отладка - проверяем загрузку файла
        console.log('Плеер инициализирован');
        console.log('Путь к файлу:', audioPlayer.src || audioPlayer.currentSrc);
        
        // Кнопка Play/Pause
        playPauseBtn.addEventListener('click', function() {
            console.log('Нажата кнопка play/pause, isPlaying:', isPlaying);
            
            if (isPlaying) {
                audioPlayer.pause();
                playPauseBtn.textContent = '▶️';
                isPlaying = false;
                console.log('Музыка поставлена на паузу');
            } else {
                console.log('Попытка воспроизведения...');
                audioPlayer.play().then(function() {
                    console.log('Воспроизведение началось успешно');
                    playPauseBtn.textContent = '⏸️';
                    isPlaying = true;
                }).catch(function(error) {
                    console.log('Ошибка воспроизведения:', error);
                    songNameDisplay.textContent = 'Ошибка воспроизведения';
                });
            }
        });
        
        // Контроль громкости
        volumeSlider.addEventListener('input', function() {
            audioPlayer.volume = this.value / 100;
            console.log('Громкость изменена на:', this.value);
        });
        
        // Обработчики событий аудио
        audioPlayer.addEventListener('loadstart', function() {
            console.log('Начата загрузка файла');
        });
        
        audioPlayer.addEventListener('loadeddata', function() {
            console.log('Файл загружен успешно');
            songNameDisplay.textContent = 'Наша любимая песня';
        });
        
        audioPlayer.addEventListener('canplay', function() {
            console.log('Файл готов к воспроизведению');
        });
        
        audioPlayer.addEventListener('error', function(e) {
            console.log('Ошибка загрузки файла:', e);
            console.log('Код ошибки:', audioPlayer.error ? audioPlayer.error.code : 'неизвестно');
            songNameDisplay.textContent = 'Файл не найден';
        });
        
        audioPlayer.addEventListener('ended', function() {
            console.log('Воспроизведение завершено');
            playPauseBtn.textContent = '▶️';
            isPlaying = false;
        });
        
        // Проверяем, можем ли мы загрузить файл
        audioPlayer.load();
    } else {
        console.log('Не удалось найти элементы плеера');
    }
    
    // Адаптивность для мобильных устройств
    function handleResize() {
        // Пересчитываем позиции кнопок при изменении размера окна
        positionMemoryButtons();
    }
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', handleResize);
    handleResize(); // Вызываем при загрузке
    
    console.log('Интерактивное меню готово! Нажми на сердце 💕');
});
// ГЛОБАЛЬНАЯ ГАЛЕРЕЯ ДЛЯ КНОПКИ 1
let gallery1 = {
    currentIndex: 0,
    totalImages: 5,
    
    showImage: function(index) {
        const images = document.querySelectorAll('#memory-modal-1 .gallery-img');
        const counter = document.getElementById('currentImg1');
        
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        
        this.currentIndex = index;
        if (counter) {
            counter.textContent = index + 1;
        }
    },
    
    nextImage: function() {
        const nextIndex = (this.currentIndex + 1) % this.totalImages;
        this.showImage(nextIndex);
    },
    
    prevImage: function() {
        const prevIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.showImage(prevIndex);
    }
};
// ГЛОБАЛЬНАЯ ГАЛЕРЕЯ ДЛЯ КНОПКИ 2
let gallery2 = {
    currentIndex: 0,
    totalImages: 5,
    
    showImage: function(index) {
        const images = document.querySelectorAll('#memory-modal-2 .gallery-img');
        const counter = document.getElementById('currentImg2');
        
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        
        this.currentIndex = index;
        if (counter) {
            counter.textContent = index + 1;
        }
    },
    
    nextImage: function() {
        const nextIndex = (this.currentIndex + 1) % this.totalImages;
        this.showImage(nextIndex);
    },
    
    prevImage: function() {
        const prevIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.showImage(prevIndex);
    }
};
// ГЛОБАЛЬНАЯ ГАЛЕРЕЯ ДЛЯ КНОПКИ 3
let gallery3 = {
    currentIndex: 0,
    totalImages: 5,
    
    showImage: function(index) {
        const images = document.querySelectorAll('#memory-modal-3 .gallery-img');
        const counter = document.getElementById('currentImg3');
        
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        
        this.currentIndex = index;
        if (counter) {
            counter.textContent = index + 1;
        }
    },
    
    nextImage: function() {
        const nextIndex = (this.currentIndex + 1) % this.totalImages;
        this.showImage(nextIndex);
    },
    
    prevImage: function() {
        const prevIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.showImage(prevIndex);
    }
};
// ГЛОБАЛЬНАЯ ГАЛЕРЕЯ ДЛЯ КНОПКИ 4
let gallery4 = {
    currentIndex: 0,
    totalImages: 5,
    
    showImage: function(index) {
        const images = document.querySelectorAll('#memory-modal-4 .gallery-img');
        const counter = document.getElementById('currentImg4');
        
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        
        this.currentIndex = index;
        if (counter) {
            counter.textContent = index + 1;
        }
    },
    
    nextImage: function() {
        const nextIndex = (this.currentIndex + 1) % this.totalImages;
        this.showImage(nextIndex);
    },
    
    prevImage: function() {
        const prevIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.showImage(prevIndex);
    }
};
// ГЛОБАЛЬНАЯ ГАЛЕРЕЯ ДЛЯ КНОПКИ 5
let gallery5 = {
    currentIndex: 0,
    totalImages: 5,
    
    showImage: function(index) {
        const images = document.querySelectorAll('#memory-modal-5 .gallery-img');
        const counter = document.getElementById('currentImg5');
        
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        
        this.currentIndex = index;
        if (counter) {
            counter.textContent = index + 1;
        }
    },
    
    nextImage: function() {
        const nextIndex = (this.currentIndex + 1) % this.totalImages;
        this.showImage(nextIndex);
    },
    
    prevImage: function() {
        const prevIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.showImage(prevIndex);
    }
};
// ГЛОБАЛЬНАЯ ГАЛЕРЕЯ ДЛЯ КНОПКИ 6
let gallery6 = {
    currentIndex: 0,
    totalImages: 5,
    
    showImage: function(index) {
        const images = document.querySelectorAll('#memory-modal-6 .gallery-img');
        const counter = document.getElementById('currentImg6');
        
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        
        this.currentIndex = index;
        if (counter) {
            counter.textContent = index + 1;
        }
    },
    
    nextImage: function() {
        const nextIndex = (this.currentIndex + 1) % this.totalImages;
        this.showImage(nextIndex);
    },
    
    prevImage: function() {
        const prevIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.showImage(prevIndex);
    }
};
// ГЛОБАЛЬНАЯ ГАЛЕРЕЯ ДЛЯ КНОПКИ 7
let gallery7 = {
    currentIndex: 0,
    totalImages: 5,
    
    showImage: function(index) {
        const images = document.querySelectorAll('#memory-modal-7 .gallery-img');
        const counter = document.getElementById('currentImg7');
        
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        
        this.currentIndex = index;
        if (counter) {
            counter.textContent = index + 1;
        }
    },
    
    nextImage: function() {
        const nextIndex = (this.currentIndex + 1) % this.totalImages;
        this.showImage(nextIndex);
    },
    
    prevImage: function() {
        const prevIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.showImage(prevIndex);
    }
};
// ГЛОБАЛЬНАЯ ГАЛЕРЕЯ ДЛЯ КНОПКИ 8
let gallery8 = {
    currentIndex: 0,
    totalImages: 5,
    
    showImage: function(index) {
        const images = document.querySelectorAll('#memory-modal-8 .gallery-img');
        const counter = document.getElementById('currentImg8');
        
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        
        this.currentIndex = index;
        if (counter) {
            counter.textContent = index + 1;
        }
    },
    
    nextImage: function() {
        const nextIndex = (this.currentIndex + 1) % this.totalImages;
        this.showImage(nextIndex);
    },
    
    prevImage: function() {
        const prevIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.showImage(prevIndex);
    }
};

// ГЛОБАЛЬНАЯ ГАЛЕРЕЯ ДЛЯ КНОПКИ 9
let gallery9 = {
    currentIndex: 0,
    totalImages: 5,
    
    showImage: function(index) {
        const images = document.querySelectorAll('#memory-modal-9 .gallery-img');
        const counter = document.getElementById('currentImg9');
        
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        
        this.currentIndex = index;
        if (counter) {
            counter.textContent = index + 1;
        }
    },
    
    nextImage: function() {
        const nextIndex = (this.currentIndex + 1) % this.totalImages;
        this.showImage(nextIndex);
    },
    
    prevImage: function() {
        const prevIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.showImage(prevIndex);
    }
};

// ГЛОБАЛЬНАЯ ГАЛЕРЕЯ ДЛЯ КНОПКИ 10
let gallery10 = {
    currentIndex: 0,
    totalImages: 6,
    
    showImage: function(index) {
        const images = document.querySelectorAll('#memory-modal-10 .gallery-img');
        const counter = document.getElementById('currentImg10');
        
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        
        this.currentIndex = index;
        if (counter) {
            counter.textContent = index + 1;
        }
    },
    
    nextImage: function() {
        const nextIndex = (this.currentIndex + 1) % this.totalImages;
        this.showImage(nextIndex);
    },
    
    prevImage: function() {
        const prevIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.showImage(prevIndex);
    }
};
