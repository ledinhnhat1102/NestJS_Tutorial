document.getElementById('productForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('price').value);
    const description = document.getElementById('description').value;
    const stockQuantity = parseInt(document.getElementById('stockQuantity').value, 10);

    try {
        const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productName, price, description, stockQuantity }),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Sản phẩm đã được thêm thành công!');
            document.getElementById('productForm').reset();
        } else {
            alert('Đã xảy ra lỗi: ' + result.message);
        }
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu:', error);
    }
});
