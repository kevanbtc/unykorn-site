// Simple Chart.js alternative - lightweight charting
class SimpleChart {
    constructor(canvas, data, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.data = data;
        this.options = {
            type: 'line',
            colors: ['#3498db', '#27ae60', '#f39c12', '#e74c3c'],
            animate: true,
            ...options
        };
        this.animationFrame = 0;
    }

    drawLine() {
        const { width, height } = this.canvas;
        const padding = 40;
        const dataPoints = this.data.datasets[0].data;
        const labels = this.data.labels;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);
        
        // Set up coordinate system
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;
        const maxValue = Math.max(...dataPoints);
        const minValue = Math.min(...dataPoints);
        const range = maxValue - minValue || 1;
        
        // Draw grid
        this.ctx.strokeStyle = '#e9ecef';
        this.ctx.lineWidth = 1;
        
        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(padding, y);
            this.ctx.lineTo(width - padding, y);
            this.ctx.stroke();
        }
        
        // Vertical grid lines  
        for (let i = 0; i <= dataPoints.length - 1; i++) {
            const x = padding + (chartWidth / (dataPoints.length - 1)) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(x, padding);
            this.ctx.lineTo(x, height - padding);
            this.ctx.stroke();
        }
        
        // Draw line
        this.ctx.strokeStyle = this.options.colors[0];
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        this.ctx.beginPath();
        dataPoints.forEach((point, index) => {
            const x = padding + (chartWidth / (dataPoints.length - 1)) * index;
            const y = height - padding - ((point - minValue) / range) * chartHeight;
            
            if (index === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        });
        this.ctx.stroke();
        
        // Draw points
        this.ctx.fillStyle = this.options.colors[0];
        dataPoints.forEach((point, index) => {
            const x = padding + (chartWidth / (dataPoints.length - 1)) * index;
            const y = height - padding - ((point - minValue) / range) * chartHeight;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, 4, 0, 2 * Math.PI);
            this.ctx.fill();
        });
        
        // Draw labels
        this.ctx.fillStyle = '#666';
        this.ctx.font = '12px Inter, sans-serif';
        this.ctx.textAlign = 'center';
        
        labels.forEach((label, index) => {
            const x = padding + (chartWidth / (dataPoints.length - 1)) * index;
            this.ctx.fillText(label, x, height - 10);
        });
    }
    
    drawDoughnut() {
        const { width, height } = this.canvas;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 3;
        const innerRadius = radius * 0.6;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);
        
        const total = this.data.datasets[0].data.reduce((a, b) => a + b, 0);
        let currentAngle = -Math.PI / 2;
        
        this.data.datasets[0].data.forEach((value, index) => {
            const sliceAngle = (value / total) * 2 * Math.PI;
            
            // Draw slice
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            this.ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
            this.ctx.closePath();
            
            this.ctx.fillStyle = this.options.colors[index % this.options.colors.length];
            this.ctx.fill();
            
            currentAngle += sliceAngle;
        });
        
        // Draw center text
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.font = 'bold 24px Inter, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('85/100', centerX, centerY + 8);
    }
    
    render() {
        if (this.options.type === 'doughnut') {
            this.drawDoughnut();
        } else {
            this.drawLine();
        }
    }
}

// Initialize charts when DOM is loaded
function initCharts() {
    // Metrics trend chart
    const trendCanvas = document.getElementById('metrics-trend');
    if (trendCanvas) {
        const trendData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                data: [120, 135, 142, 150, 155, 150]
            }]
        };
        
        const trendChart = new SimpleChart(trendCanvas, trendData, {
            type: 'line',
            colors: ['#3498db']
        });
        trendChart.render();
    }
    
    // System scorecard chart
    const scorecardCanvas = document.getElementById('scorecard-chart');
    if (scorecardCanvas) {
        const scorecardData = {
            labels: ['Security', 'Compliance', 'Reliability', 'Scalability', 'Observability'],
            datasets: [{
                data: [28, 18, 18, 13, 8]
            }]
        };
        
        const scorecardChart = new SimpleChart(scorecardCanvas, scorecardData, {
            type: 'doughnut',
            colors: ['#27ae60', '#3498db', '#f39c12', '#e74c3c', '#9b59b6']
        });
        scorecardChart.render();
    }
}