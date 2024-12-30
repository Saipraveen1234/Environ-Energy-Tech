(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });

    // Solar Calculator Constants
    const UNITS_PER_KW = 1440;        // Annual units generated per kW
    const PRICE_PER_KW = 96589;       // Price per kW in ₹
    const SPACE_PER_KW = 80;          // Space required per kW in sqft
    const SAVINGS_PER_KW = 10080;     // Annual savings per kW in ₹
    const BASE_SUBSIDY = 30000;       // Base subsidy amount in ₹
    const BILL_TO_KW_FACTOR = 700;    // Monthly bill amount that approximately equals 1 kW requirement
    

    // Calculator Functions
    function updateCalculatorResults(systemSize) {
        // Calculate results
        const spaceRequired = systemSize * SPACE_PER_KW;
        const annualEnergy = systemSize * UNITS_PER_KW;
        const annualSavings = systemSize * SAVINGS_PER_KW;
        const price = systemSize * PRICE_PER_KW;
        const subsidy = systemSize * SUBSIDY_PER_KW;
        

        // Update UI with formatted numbers
        $('#system-size').text(`${systemSize.toFixed(1)} kW`);
        $('#space-required').text(`${Math.round(spaceRequired)} sqft`);
        $('#energy-generated').text(`${Math.round(annualEnergy)} Units`);
        $('#annual-savings').text(`₹ ${Math.round(annualSavings).toLocaleString()}`);
        $('#price-excluding-subsidy').text(`₹ ${Math.round(price).toLocaleString()}`);
        $('#subsidy').text(`₹ ${Math.round(subsidy).toLocaleString()}`);
    }

    function calculateFromMonthlyBill(monthlyBill) {
        const estimatedSystemSize = monthlyBill / BILL_TO_KW_FACTOR;
        updateCalculatorResults(estimatedSystemSize);
    }

    function handleSystemSizeInput() {
        const systemSize = parseFloat($('#system-size-input').val()) || 0;
        updateCalculatorResults(Math.max(0, systemSize));
    }

    function handleMonthlyBillInput() {
        const monthlyBill = parseFloat($('#monthly-bill').val()) || 0;
        calculateFromMonthlyBill(Math.max(0, monthlyBill));
    }

    function initializeCalculator() {
        // Cache DOM elements
        const systemSizeSection = $('#system-size-section');
        const monthlyBillSection = $('#monthly-bill-section');
        const calculationToggle = $('#calculation-toggle');
        const systemSizeInput = $('#system-size-input');
        const monthlyBillInput = $('#monthly-bill');

        // Set default state
        systemSizeSection.show();
        monthlyBillSection.hide();
        systemSizeInput.val(1);
        updateCalculatorResults(1);

        // Event Listeners
        calculationToggle.on('change', function() {
            if (this.value === 'systemSize') {
                systemSizeSection.show();
                monthlyBillSection.hide();
                handleSystemSizeInput();
            } else {
                systemSizeSection.hide();
                monthlyBillSection.show();
                handleMonthlyBillInput();
            }
        });

        systemSizeInput.on('input', handleSystemSizeInput);
        monthlyBillInput.on('input', handleMonthlyBillInput);

        // Button Handlers
        $('#start-journey').on('click', function() {
            const systemSize = parseFloat($('#system-size').text());
            alert(`Starting your solar journey with a ${systemSize}kW system!`);
        });

        $('#finance-info').on('click', function() {
            const totalCost = parseFloat($('#price-excluding-subsidy').text().replace(/[^\d.-]/g, ''));
            const subsidy = parseFloat($('#subsidy').text().replace(/[^\d.-]/g, ''));
            const netCost = totalCost - subsidy;
            alert(`Finance options available for ₹${netCost.toLocaleString()}!`);
        });
    }

    // Initialize Calculator when document is ready
    $(document).ready(function() {
        initializeCalculator();
    });

    // Mobile menu toggle
    const navbarToggler = $('.navbar-toggler');
    navbarToggler.on('click', function() {
        $(this).toggleClass('active');
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        const navbar = $('.navbar-collapse');
        const toggler = $('.navbar-toggler');
        
        if (!navbar.is(e.target) && !toggler.is(e.target) && navbar.has(e.target).length === 0) {
            navbar.removeClass('show');
            toggler.removeClass('active');
        }
    });

    // Add smooth scroll for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 1000, 'easeInOutExpo');
            
            // Close mobile menu after clicking
            $('.navbar-collapse').removeClass('show');
            $('.navbar-toggler').removeClass('active');
        }
    });

    // Enhance navbar on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Solar Purpose Change Handler
    $('#solar-purpose').on('change', function() {
        const purpose = $(this).val();
        let hint = '';
        
        switch(purpose) {
            case 'Home':
                hint = 'Recommended size: 1-10 kW';
                break;
            case 'Business':
                hint = 'Recommended size: 10-100 kW';
                break;
            case 'Agriculture':
                hint = 'Recommended size: 5-50 kW';
                break;
        }
        
        // Update hint text if you have a hint element
        $('#size-hint').text(hint);
    });

    // Enhanced validation for number inputs
    $('input[type="number"]').on('input', function() {
        let value = parseFloat($(this).val());
        const min = parseFloat($(this).attr('min')) || 0;
        
        if (isNaN(value) || value < min) {
            $(this).val(min);
        }
    });

})(jQuery);
        