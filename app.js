document.addEventListener('DOMContentLoaded', () => {
    const inputName = document.getElementById('inviteeName');
    const displayNames = document.querySelectorAll('.displayNameText');
    const btnGenerateImage = document.getElementById('btnGenerateImage');
    const btnGeneratePDF = document.getElementById('btnGeneratePDF');
    const invitationCard = document.getElementById('invitationCard');

    // Update name dynamically
    inputName.addEventListener('input', (e) => {
        const name = e.target.value.trim();
        displayNames.forEach(el => {
            el.textContent = name || '___';
        });
    });

    // Generate Image function
    btnGenerateImage.addEventListener('click', async () => {
        if (!inputName.value.trim()) {
            alert('請先填寫受邀人姓名！');
            inputName.focus();
            return;
        }

        try {
            btnGenerateImage.textContent = '生成中...';
            btnGenerateImage.disabled = true;

            const dataUrl = await generateCanvasDataUrl(inputName.value.trim());
            
            // Trigger download
            const link = document.createElement('a');
            link.download = `邀請函_${inputName.value.trim()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error generating image:', error);
            alert('生成圖片失敗，請重試');
        } finally {
            btnGenerateImage.textContent = '保存為圖片';
            btnGenerateImage.disabled = false;
        }
    });

    // Generate PDF function
    btnGeneratePDF.addEventListener('click', async () => {
        if (!inputName.value.trim()) {
            alert('請先填寫受邀人姓名！');
            inputName.focus();
            return;
        }

        try {
            btnGeneratePDF.textContent = '生成中...';
            btnGeneratePDF.disabled = true;

            const dataUrl = await generateCanvasDataUrl(inputName.value.trim());
            
            // Calculate dimensions based on original image
            const { jsPDF } = window.jspdf;
            // 1536x2752 image
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [1536, 2752] 
            });

            pdf.addImage(dataUrl, 'PNG', 0, 0, 1536, 2752);
            pdf.save(`邀請函_${inputName.value.trim()}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('生成PDF失敗，請重試');
        } finally {
            btnGeneratePDF.textContent = '保存為PDF';
            btnGeneratePDF.disabled = false;
        }
    });

    // Core drawing function using native canvas for pixel-perfect quality
    async function generateCanvasDataUrl(name) {
        // Wait for fonts to be ready to ensure 'Noto Serif TC' is loaded
        await document.fonts.ready;

        const img = await new Promise((resolve, reject) => {
            const i = new Image();
            i.onload = () => resolve(i);
            i.onerror = reject;
            i.src = INVITATION_TEMPLATE_DATA_URL;
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.width;   // 1536
        canvas.height = img.height; // 2752
        const ctx = canvas.getContext('2d');

        // Draw background at native resolution (Zero degradation)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Setup text styling
        const fontSize = 43;
        ctx.font = `bold ${fontSize}px "Noto Serif TC", "Noto Serif SC", serif`;
        ctx.fillStyle = '#FAD97A';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Add text shadow matching CSS
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        const yPos = canvas.height * 0.53 + (fontSize / 2);
        const text = `尊敬的   ${name}   閣下：`;
        
        ctx.fillText(text, canvas.width / 2, yPos);

        // Draw the underline for the name
        ctx.shadowColor = 'transparent'; // Remove shadow for the line
        const prefixWidth = ctx.measureText("尊敬的   ").width;
        const nameWidth = ctx.measureText(name).width;
        const fullWidth = ctx.measureText(text).width;
        
        const startX = (canvas.width / 2) - (fullWidth / 2) + prefixWidth - 8;
        const endX = startX + nameWidth + 16;
        const lineY = yPos + (fontSize / 2) + 5;

        ctx.beginPath();
        ctx.moveTo(startX, lineY);
        ctx.lineTo(endX, lineY);
        ctx.strokeStyle = '#FAD97A';
        ctx.lineWidth = 2;
        ctx.stroke();

        return canvas.toDataURL('image/png', 1.0);
    }
});
