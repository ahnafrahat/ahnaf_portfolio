// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// 3D Globe Visualization
function initGlobe() {
    const container = document.getElementById('globe-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create sliced sphere
    const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x1a1b4b,
        shininess: 100,
        side: THREE.DoubleSide
    });

    const slices = 8;
    const sliceSpacing = 0.5;
    const sphereSlices = [];

    for (let i = 0; i < slices; i++) {
        const slice = new THREE.Mesh(sphereGeometry, sphereMaterial);
        slice.position.y = i * sliceSpacing;
        slice.scale.set(1 - (i * 0.05), 0.1, 1 - (i * 0.05));
        sphereSlices.push(slice);
        scene.add(slice);
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point lights
    const pointLight1 = new THREE.PointLight(0x9333ea, 1);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xe11d48, 1);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Position camera
    camera.position.z = 15;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        sphereSlices.forEach((slice, index) => {
            slice.rotation.y += 0.01 * (1 + index * 0.1);
            slice.position.y = Math.sin(Date.now() * 0.001 + index) * 0.2 + (index * sliceSpacing);
        });

        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });

    // Add mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    function updateCameraPosition() {
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
    }

    // Combined animation loop
    function render() {
        requestAnimationFrame(render);
        updateCameraPosition();
        animate();
    }

    // Start animation
    render();
}

// Initialize globe when the page loads
window.addEventListener('load', initGlobe);

// Form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    contactForm.innerHTML = `
        <div style="text-align: center;">
            <h3 style="color: var(--accent-purple); margin-bottom: 1rem;">Message Sent!</h3>
            <p>Thanks for reaching out. I'll get back to you soon.</p>
        </div>
    `;
});

// Add parallax effect to hero section
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    hero.style.transform = `
        perspective(1000px)
        rotateY(${mouseX * 5}deg)
        rotateX(${-mouseY * 5}deg)
    `;
}); 