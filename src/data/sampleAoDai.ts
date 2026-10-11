import { SampleImage } from '../types/aodai';

// SVG Data URIs representing high quality Ao Dai layout samples for instant demonstration
const sample1Svg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="600" height="900">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fbf8f3"/>
      <stop offset="100%" stop-color="#f3ece2"/>
    </linearGradient>
    <linearGradient id="aoGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fdfbf7"/>
      <stop offset="50%" stop-color="#f9f4ea"/>
      <stop offset="100%" stop-color="#f2ebd9"/>
    </linearGradient>
    <linearGradient id="branchGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4a3b32"/>
      <stop offset="100%" stop-color="#7a6252"/>
    </linearGradient>
    <radialGradient id="flowerGrad" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#ff7b89"/>
      <stop offset="60%" stop-color="#e63956"/>
      <stop offset="100%" stop-color="#9e1b32"/>
    </radialGradient>
    <radialGradient id="secFlower" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#ffb3ba"/>
      <stop offset="80%" stop-color="#f26a8d"/>
      <stop offset="100%" stop-color="#bc2f58"/>
    </radialGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#3c2f2f" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="600" height="900" fill="url(#bgGrad)"/>
  
  <!-- Subtle silk textures / decorative border -->
  <rect x="25" y="25" width="550" height="850" rx="16" fill="none" stroke="#d5c7b3" stroke-width="1.5" stroke-dasharray="6,4"/>

  <!-- Ao Dai Silhouette Mannequin outline -->
  <g filter="url(#softShadow)">
    <!-- Neck Collar -->
    <path d="M 270 95 C 270 82, 330 82, 330 95 L 325 125 C 310 132, 290 132, 275 125 Z" fill="#eee5d5" stroke="#c8baaa" stroke-width="1.5"/>
    
    <!-- Body & Flowing Panels (Ao Dai Tà Trước) -->
    <path d="M 275 125 
             C 240 135, 210 160, 200 185
             C 192 210, 225 280, 235 320
             C 245 360, 240 400, 245 440
             C 240 500, 220 620, 195 780
             C 230 795, 370 795, 405 780
             C 380 620, 360 500, 355 440
             C 360 400, 355 360, 365 320
             C 375 280, 408 210, 400 185
             C 390 160, 360 135, 325 125
             Z" 
          fill="url(#aoGrad)" stroke="#cebead" stroke-width="2"/>
    
    <!-- Waist definition line (subtle) -->
    <path d="M 245 370 C 300 380, 300 380, 355 370" fill="none" stroke="#d9cbbe" stroke-width="1" stroke-dasharray="2,3"/>
    <!-- Tà sau peek -->
    <path d="M 190 780 C 180 820, 420 820, 410 780" fill="none" stroke="#d9cbbe" stroke-width="1.5"/>
  </g>

  <!-- Title Watermark -->
  <text x="300" y="60" text-anchor="middle" font-family="'Cinzel', serif, sans-serif" font-size="14" font-weight="bold" fill="#8c7a6b" letter-spacing="3">MẪU 1: XUÂN MẠCH PHÙ SA</text>
  <text x="300" y="80" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#a89a8c">Bố cục S-Flow Continuous (Đẳng cấp Haute Couture)</text>

  <!-- S-FLOW PATTERN (Vai phải -> Ngực -> Cành mảnh 45 độ xuyên eo -> Tà nhẹ dần) -->
  
  <!-- Lá ẩn hậu cảnh (loang mờ nhạt) -->
  <g opacity="0.35">
    <ellipse cx="255" cy="200" rx="35" ry="18" fill="#7d9b76" transform="rotate(-30 255 200)"/>
    <ellipse cx="290" cy="245" rx="30" ry="14" fill="#85a37f" transform="rotate(40 290 245)"/>
    <ellipse cx="320" cy="330" rx="25" ry="12" fill="#7d9b76" transform="rotate(-15 320 330)"/>
    <ellipse cx="270" cy="480" rx="28" ry="12" fill="#8ba885" transform="rotate(25 270 480)"/>
    <ellipse cx="250" cy="620" rx="20" ry="9" fill="#95b28f" transform="rotate(-20 250 620)"/>
  </g>

  <!-- CÀNH CHÍNH (Xương sống dòng chảy - Gốc to ngọn nhỏ, uốn lượn chữ S mềm mại, xuyên eo 45 độ) -->
  <path d="M 240 160 
           Q 260 190, 265 240
           Q 270 300, 310 360
           Q 340 410, 310 490
           Q 280 560, 275 660
           Q 270 710, 260 760" 
        fill="none" stroke="url(#branchGrad)" stroke-width="5" stroke-linecap="round"/>
        
  <!-- Nhánh phụ thanh mảnh uốn lượn -->
  <path d="M 265 240 Q 300 230, 320 215" fill="none" stroke="#5a473c" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 310 360 Q 345 375, 350 400" fill="none" stroke="#5a473c" stroke-width="2" stroke-linecap="round"/>
  <path d="M 310 490 Q 285 510, 265 525" fill="none" stroke="#685447" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M 275 660 Q 295 680, 290 710" fill="none" stroke="#7a6557" stroke-width="1.2" stroke-linecap="round"/>

  <!-- HỆ THỐNG LÁ HIỆN (Xanh trầm desaturated, gân lá sắc nét, bệ đỡ cho hoa) -->
  <!-- Vùng ngực/vai dày nhất -->
  <g>
    <!-- Lá gần ngực -->
    <path d="M 245 210 Q 230 190, 215 195 Q 230 220, 245 210 Z" fill="#4d6951" stroke="#334636" stroke-width="1"/>
    <path d="M 245 210 L 222 198" stroke="#f0f5ee" stroke-width="0.8"/> <!-- Chừa sáng gân lá -->
    
    <path d="M 275 255 Q 300 270, 315 260 Q 295 245, 275 255 Z" fill="#58755c" stroke="#3b503f" stroke-width="1"/>
    <path d="M 275 255 L 305 262" stroke="#f0f5ee" stroke-width="0.8"/>

    <path d="M 285 220 Q 305 200, 325 210 Q 305 225, 285 220 Z" fill="#466049" stroke="#2c3e2f" stroke-width="1"/>
    <path d="M 285 220 L 315 208" stroke="#f0f5ee" stroke-width="0.8"/>
  </g>

  <!-- Lá vùng eo (mảnh, thưa, tạo khoảng thở eo không bít kín) -->
  <g>
    <path d="M 320 375 Q 340 380, 355 370 Q 335 365, 320 375 Z" fill="#627e66" stroke="#485d4b" stroke-width="0.8"/>
    <path d="M 320 375 L 345 374" stroke="#f0f5ee" stroke-width="0.6"/>
  </g>

  <!-- Lá vùng hông & tà (thưa dần, nhẹ nhàng) -->
  <g>
    <path d="M 295 505 Q 275 520, 260 515 Q 280 500, 295 505 Z" fill="#6d8a71" stroke="#4f6653" stroke-width="0.8"/>
    <path d="M 275 640 Q 290 650, 295 665 Q 280 655, 275 640 Z" fill="#7d9981" stroke="#5a705e" stroke-width="0.7"/>
    <path d="M 268 730 Q 280 740, 285 750 Q 272 742, 268 730 Z" fill="#8ea892" stroke="#687e6b" stroke-width="0.5"/>
  </g>

  <!-- HOA CHÍNH (FOCAL POINT CAO VỊ Ở NGỰC/VAI TRÊN - Đỏ thắm đa sắc độ, nhụy 3D) -->
  <!-- Hoa đại cúc/đào lớn tại ngực -->
  <g transform="translate(255, 215)">
    <circle cx="0" cy="0" r="32" fill="url(#flowerGrad)"/>
    <!-- Cánh hoa xếp lớp -->
    <path d="M -15 -25 Q 0 -40, 15 -25 Q 0 -15, -15 -25 Z" fill="#ff5c77"/>
    <path d="M 15 -20 Q 35 -10, 25 10 Q 10 0, 15 -20 Z" fill="#e63352"/>
    <path d="M 20 10 Q 30 30, 10 32 Q 5 15, 20 10 Z" fill="#c71f3d"/>
    <path d="M -10 25 Q -25 30, -28 10 Q -10 10, -10 25 Z" fill="#d92546"/>
    <path d="M -25 5 Q -38 -15, -15 -18 Q -10 -5, -25 5 Z" fill="#ff4d6d"/>
    <!-- Tâm nhụy 3D ánh vàng stippling -->
    <circle cx="0" cy="0" r="8" fill="#ffe066" stroke="#c99700" stroke-width="1.5"/>
    <circle cx="-2" cy="-2" r="1.5" fill="#fff"/>
    <circle cx="2" cy="1" r="1.2" fill="#b38600"/>
    <circle cx="-1" cy="3" r="1" fill="#b38600"/>
  </g>

  <!-- Hoa cấp 2 (Secondary Focal Point) gần vai -->
  <g transform="translate(230, 165)">
    <circle cx="0" cy="0" r="22" fill="url(#secFlower)"/>
    <circle cx="0" cy="0" r="5" fill="#ffea75" stroke="#b38600" stroke-width="1"/>
  </g>

  <!-- Hoa cấp 2 phía ngực dưới -->
  <g transform="translate(295, 290)">
    <circle cx="0" cy="0" r="24" fill="url(#flowerGrad)"/>
    <circle cx="0" cy="0" r="6" fill="#ffe066" stroke="#b38600" stroke-width="1"/>
  </g>

  <!-- Điểm giữ nhịp tại eo/hông (Secondary Accent - kích thước nhỏ hơn, không lấn át eo) -->
  <g transform="translate(330, 395)">
    <circle cx="0" cy="0" r="16" fill="url(#secFlower)"/>
    <circle cx="0" cy="0" r="4" fill="#ffea75"/>
  </g>

  <!-- Hoa nhỏ rơi rụng nhịp điệu (Rhythmic Detail) ở thân dưới & tà áo -->
  <g transform="translate(300, 480)">
    <circle cx="0" cy="0" r="12" fill="url(#flowerGrad)"/>
    <circle cx="0" cy="0" r="3" fill="#ffe066"/>
  </g>
  <g transform="translate(280, 580)">
    <circle cx="0" cy="0" r="9" fill="url(#secFlower)"/>
    <circle cx="0" cy="0" r="2" fill="#ffe066"/>
  </g>
  <g transform="translate(270, 680)">
    <circle cx="0" cy="0" r="6" fill="url(#secFlower)" opacity="0.9"/>
  </g>
  <g transform="translate(260, 755)">
    <circle cx="0" cy="0" r="4" fill="#f26a8d" opacity="0.8"/>
  </g>

  <!-- Cánh hoa rơi lững lờ theo gió (Visual Echo & Negative Space) -->
  <path d="M 370 260 Q 380 250, 375 240 Q 365 250, 370 260 Z" fill="#ff7b89" opacity="0.7"/>
  <path d="M 360 460 Q 370 450, 365 440 Q 355 450, 360 460 Z" fill="#f26a8d" opacity="0.6"/>

  <!-- Chú thích bố cục trực quan trên bản vẽ -->
  <rect x="50" y="810" width="500" height="60" rx="8" fill="#ffffff" fill-opacity="0.85" stroke="#d5c7b3"/>
  <text x="70" y="832" font-family="sans-serif" font-size="12" font-weight="bold" fill="#3a2e2b">Đặc trưng bố cục:</text>
  <text x="70" y="852" font-family="sans-serif" font-size="11" fill="#66554b">S-Flow continuous chuẩn mực; Cành chéo 45° bóp eo; Mật độ giảm dần (Gradient); 75% khoảng thở tinh tế.</text>
</svg>
`)}`;

const sample2Svg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="600" height="900">
  <defs>
    <linearGradient id="bgGrad2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f2f6f5"/>
      <stop offset="100%" stop-color="#e3edea"/>
    </linearGradient>
    <linearGradient id="aoGrad2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f5faf8"/>
    </linearGradient>
    <radialGradient id="lotusPink" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#f7a8b8"/>
      <stop offset="100%" stop-color="#d44b6c"/>
    </radialGradient>
    <radialGradient id="lotusLeaf" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#5a8274"/>
      <stop offset="100%" stop-color="#28483d"/>
    </radialGradient>
  </defs>

  <rect width="600" height="900" fill="url(#bgGrad2)"/>
  <rect x="25" y="25" width="550" height="850" rx="16" fill="none" stroke="#b5cdc4" stroke-width="1.5" stroke-dasharray="6,4"/>

  <!-- Ao Dai Mannequin -->
  <g>
    <!-- Neck Collar -->
    <path d="M 270 95 C 270 82, 330 82, 330 95 L 325 125 C 310 132, 290 132, 275 125 Z" fill="#eef5f2" stroke="#b5cdc4" stroke-width="1.5"/>
    <!-- Body Panels -->
    <path d="M 275 125 C 240 135, 210 160, 200 185 C 192 210, 225 280, 235 320 C 245 360, 240 400, 245 440 C 240 500, 220 620, 195 780 C 230 795, 370 795, 405 780 C 380 620, 360 500, 355 440 C 360 400, 355 360, 365 320 C 375 280, 408 210, 400 185 C 390 160, 360 135, 325 125 Z" 
          fill="url(#aoGrad2)" stroke="#b5cdc4" stroke-width="2"/>
  </g>

  <text x="300" y="60" text-anchor="middle" font-family="'Cinzel', serif, sans-serif" font-size="14" font-weight="bold" fill="#325247" letter-spacing="3">MẪU 2: DẠ LIÊN THIỀN TĨNH</text>
  <text x="300" y="80" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#587a70">Bố cục Trọng tâm thấp (Lower Anchor & Zen Minimalist 85% khoảng thở)</text>

  <!-- LÁ SEN & HOA SEN TẠI GẤU ÁO VƯƠN LÊN HỮU CƠ -->
  <!-- Lá sen to gốc ở gấu áo tạo bệ đỡ vững chãi -->
  <g transform="translate(300, 740)">
    <ellipse cx="20" cy="10" rx="90" ry="38" fill="url(#lotusLeaf)"/>
    <path d="M 20 10 L -40 -10 M 20 10 L 80 -10 M 20 10 L 30 40 M 20 10 L -20 35" stroke="#7eb5a2" stroke-width="1.2"/>
  </g>

  <!-- Lá sen ẩn loang mờ -->
  <ellipse cx="230" cy="710" rx="55" ry="24" fill="#a4c6ba" opacity="0.35"/>

  <!-- Cuống sen vươn lên nhịp nhàng -->
  <path d="M 310 740 Q 300 620, 260 540" fill="none" stroke="#375549" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M 320 740 Q 350 660, 360 600" fill="none" stroke="#486d5e" stroke-width="2.5" stroke-linecap="round"/>

  <!-- Bông Sen Nở chính (Focal ở tầm tà trên gấu) -->
  <g transform="translate(260, 540)">
    <!-- Cánh sen ngoài -->
    <path d="M -35 15 C -45 -20, -10 -40, 0 -55 C 10 -40, 45 -20, 35 15 Z" fill="url(#lotusPink)"/>
    <path d="M -20 10 C -30 -15, -5 -35, 0 -45 C 5 -35, 30 -15, 20 10 Z" fill="#ffffff" opacity="0.9"/>
    <!-- Nhụy sen vàng -->
    <ellipse cx="0" cy="-10" rx="8" ry="5" fill="#fcd34d" stroke="#d97706" stroke-width="1"/>
  </g>

  <!-- Búp sen non vươn nhẹ -->
  <g transform="translate(360, 600)">
    <path d="M -10 10 C -15 -10, 0 -25, 0 -30 C 0 -25, 15 -10, 10 10 Z" fill="url(#lotusPink)"/>
  </g>

  <!-- Thân trên & Ngực để khoảng trống thiền định thanh khiết, chỉ điểm nhẹ giọt sương / sợi tơ -->
  <circle cx="280" cy="220" r="3" fill="#6ba08e" opacity="0.4"/>
  <circle cx="288" cy="240" r="2" fill="#6ba08e" opacity="0.3"/>

  <rect x="50" y="810" width="500" height="60" rx="8" fill="#ffffff" fill-opacity="0.85" stroke="#b5cdc4"/>
  <text x="70" y="832" font-family="sans-serif" font-size="12" font-weight="bold" fill="#234237">Đặc trưng bố cục:</text>
  <text x="70" y="852" font-family="sans-serif" font-size="11" fill="#4d6f63">Gốc rễ vững chãi ở gấu; Cuống sen vươn hữu cơ; 85% khoảng thở thiền vị; Tuyệt đối không bị ngắt quãng vì kết thúc mềm.</text>
</svg>
`)}`;

const sample3Svg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="600" height="900">
  <defs>
    <linearGradient id="bgGrad3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#141926"/>
      <stop offset="100%" stop-color="#0a0d14"/>
    </linearGradient>
    <linearGradient id="aoGrad3" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e2438"/>
      <stop offset="100%" stop-color="#151a29"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff3b0"/>
      <stop offset="50%" stop-color="#e6b800"/>
      <stop offset="100%" stop-color="#997300"/>
    </linearGradient>
  </defs>

  <rect width="600" height="900" fill="url(#bgGrad3)"/>
  <rect x="25" y="25" width="550" height="850" rx="16" fill="none" stroke="#333f5c" stroke-width="1.5" stroke-dasharray="6,4"/>

  <!-- Ao Dai Mannequin -->
  <g>
    <path d="M 270 95 C 270 82, 330 82, 330 95 L 325 125 C 310 132, 290 132, 275 125 Z" fill="#2a334d" stroke="#485880" stroke-width="1.5"/>
    <path d="M 275 125 C 240 135, 210 160, 200 185 C 192 210, 225 280, 235 320 C 245 360, 240 400, 245 440 C 240 500, 220 620, 195 780 C 230 795, 370 795, 405 780 C 380 620, 360 500, 355 440 C 360 400, 355 360, 365 320 C 375 280, 408 210, 400 185 C 390 160, 360 135, 325 125 Z" 
          fill="url(#aoGrad3)" stroke="#3e4c70" stroke-width="2"/>
  </g>

  <text x="300" y="60" text-anchor="middle" font-family="'Cinzel', serif, sans-serif" font-size="14" font-weight="bold" fill="#e6b800" letter-spacing="3">MẪU 3: HOÀNG TRIỀU KIM CÚC</text>
  <text x="300" y="80" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#8c9fc4">Bố cục Vương miện ngực (Crowned Chest / Upper Focal - Quyền lực dạ tiệc)</text>

  <!-- CROWNED CHEST: TẬP TRUNG TẠI CỔ/VAI/NGỰC, KẾT THÚC MỀM Ở EO TRÊN, THÂN DƯỚI TRỐNG SANG TRỌNG -->
  <g transform="translate(300, 190)">
    <!-- Vòng hoa cúc hoàng kim ôm cổ và tỏa ra hai vai -->
    <path d="M -70 -40 Q 0 -65, 70 -40 Q 40 30, 0 50 Q -40 30, -70 -40 Z" fill="none" stroke="url(#goldGrad)" stroke-width="3" opacity="0.6"/>
    
    <!-- Hoa cúc trung tâm lớn ngực -->
    <circle cx="0" cy="0" r="28" fill="url(#goldGrad)"/>
    <circle cx="0" cy="0" r="10" fill="#ffffff"/>
    
    <!-- Cụm hoa tỏa vai trái -->
    <circle cx="-55" cy="-25" r="18" fill="url(#goldGrad)"/>
    <!-- Cụm hoa tỏa vai phải -->
    <circle cx="55" cy="-25" r="18" fill="url(#goldGrad)"/>
    
    <!-- Lá mạ vàng tỏa tia (Radiating Arc) -->
    <path d="M -20 -15 L -45 -55 M 20 -15 L 45 -55 M -15 25 L -35 60 M 15 25 L 35 60" stroke="#fcd34d" stroke-width="2" stroke-linecap="round"/>
    
    <!-- Kết thúc mềm mại ở eo trên (chấm bụi vàng tan dần) -->
    <circle cx="0" cy="65" r="5" fill="#fcd34d" opacity="0.8"/>
    <circle cx="-15" cy="85" r="3" fill="#fcd34d" opacity="0.5"/>
    <circle cx="12" cy="95" r="2" fill="#fcd34d" opacity="0.4"/>
    <circle cx="-5" cy="115" r="1.5" fill="#fcd34d" opacity="0.2"/>
  </g>

  <!-- Thân dưới tà áo đen huyền ảo hoàn toàn sạch bóng, vải gấm cao cấp tự phát huy giá trị -->
  <rect x="50" y="810" width="500" height="60" rx="8" fill="#1e2438" fill-opacity="0.9" stroke="#485880"/>
  <text x="70" y="832" font-family="sans-serif" font-size="12" font-weight="bold" fill="#fcd34d">Đặc trưng bố cục:</text>
  <text x="70" y="852" font-family="sans-serif" font-size="11" fill="#c3d1ed">Cung tỏa (Radiating Arc); Sáng khuôn mặt; KHÔNG cần kéo xuống tà theo đúng chuẩn V2.1; Thân dưới trống đẳng cấp.</text>
</svg>
`)}`;

const sample4Svg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="600" height="900">
  <defs>
    <linearGradient id="bgGrad4" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff5f5"/>
      <stop offset="100%" stop-color="#ffebeb"/>
    </linearGradient>
  </defs>

  <rect width="600" height="900" fill="url(#bgGrad4)"/>
  <rect x="25" y="25" width="550" height="850" rx="16" fill="none" stroke="#fca5a5" stroke-width="1.5" stroke-dasharray="6,4"/>

  <!-- Ao Dai Mannequin -->
  <g>
    <path d="M 270 95 C 270 82, 330 82, 330 95 L 325 125 C 310 132, 290 132, 275 125 Z" fill="#fef2f2" stroke="#f87171" stroke-width="1.5"/>
    <path d="M 275 125 C 240 135, 210 160, 200 185 C 192 210, 225 280, 235 320 C 245 360, 240 400, 245 440 C 240 500, 220 620, 195 780 C 230 795, 370 795, 405 780 C 380 620, 360 500, 355 440 C 360 400, 355 360, 365 320 C 375 280, 408 210, 400 185 C 390 160, 360 135, 325 125 Z" 
          fill="#ffffff" stroke="#f87171" stroke-width="2"/>
  </g>

  <text x="300" y="60" text-anchor="middle" font-family="'Cinzel', serif, sans-serif" font-size="14" font-weight="bold" fill="#b91c1c" letter-spacing="3">MẪU 4: MẪU LỖI ĐỨT ĐOẠN & NẶNG TÀ</text>
  <text x="300" y="80" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#dc2626">Ví dụ minh họa vi phạm điều cấm kỵ (Đứt đoạn ở eo, nặng tà, màu nóng ở bụng)</text>

  <!-- LỖI 1: Hoa ở ngực bị cắt cụt đột ngột -->
  <g transform="translate(260, 190)">
    <circle cx="0" cy="0" r="22" fill="#ef4444"/>
    <circle cx="20" cy="15" r="14" fill="#f97316"/>
  </g>

  <!-- LỖI 2: Đứt đoạn hoàn toàn ở eo - không có cành nối, không có dòng dẫn -->
  <!-- Vết cắt / đứt đoạn cảnh báo -->
  <line x1="220" y1="360" x2="380" y2="360" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4"/>
  <text x="300" y="352" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ef4444">⚠ ĐỨT ĐOẠN ĐỘT NGỘT Ở EO (VI PHẠM ĐIỀU CẤM 2)</text>

  <!-- LỖI 3: Khối màu nóng cực lớn ở vùng eo/bụng dưới -> làm phình to vòng 2 (Vi phạm Điều Cấm 11) -->
  <g transform="translate(300, 420)">
    <ellipse cx="0" cy="0" rx="45" ry="30" fill="#ea580c"/>
    <circle cx="0" cy="0" r="15" fill="#facc15"/>
    <text x="0" y="4" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="#ffffff">MÀU NÓNG PHÌNH BỤNG</text>
  </g>

  <!-- LỖI 4: Tà áo quá dày đặc, hoa to kín đáy áo làm người mặc lùn tịt (Vi phạm Điều Cấm 3 & 5) -->
  <g transform="translate(300, 720)">
    <rect x="-80" y="-30" width="160" height="70" fill="#dc2626" rx="10"/>
    <circle cx="-50" cy="5" r="25" fill="#f97316"/>
    <circle cx="0" cy="5" r="28" fill="#e11d48"/>
    <circle cx="50" cy="5" r="25" fill="#ea580c"/>
    <text x="0" y="10" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ffffff">MẬT ĐỘ TÀ QUÁ DÀY ĐẶC</text>
  </g>

  <rect x="50" y="810" width="500" height="60" rx="8" fill="#fef2f2" fill-opacity="0.95" stroke="#f87171"/>
  <text x="70" y="832" font-family="sans-serif" font-size="12" font-weight="bold" fill="#991b1b">Lỗi phát hiện:</text>
  <text x="70" y="852" font-family="sans-serif" font-size="11" fill="#b91c1c">Đứt đoạn eo; Nặng tà làm lùn dáng; Màu nóng phình eo (vi phạm 4 điều cấm kỵ; Thang điểm ~42 Kém).</text>
</svg>
`)}`;

export const SAMPLE_AODAI_LIST: SampleImage[] = [
  {
    id: 'sample-s-flow',
    title: 'Xuân Mạch Phù Sa',
    subtitle: 'Bố cục S-Flow Continuous Chuẩn Mực',
    tag: 'Haute Couture',
    description: 'Dòng chảy chữ S liên tục từ vai xuống tà, cành mảnh 45° xuyên eo bóp eo ảo, hoa chính cao vị, mật độ giảm dần và khoảng thở 75%.',
    imageUrl: sample1Svg,
  },
  {
    id: 'sample-lower-anchor',
    title: 'Dạ Liên Thiền Tĩnh',
    subtitle: 'Bố cục Trọng Tâm Thấp (Lower Anchor)',
    tag: 'Thiền Tối Giản',
    description: 'Gốc rễ vững chãi ở gấu áo vươn lên hữu cơ, kết thúc mềm mại ở ngực dưới, khoảng trống chiếm 85% mang đậm tinh thần Wabi-sabi.',
    imageUrl: sample2Svg,
  },
  {
    id: 'sample-crowned-chest',
    title: 'Hoàng Triều Kim Cúc',
    subtitle: 'Bố cục Vương Miện Ngực (Crowned Chest)',
    tag: 'Dạ Tiệc Hoàng Gia',
    description: 'Cung tỏa mạnh mẽ ở cổ và vai sáng mặt, kết thúc mềm ở eo trên, thân dưới trống không cần xuống tà theo đúng chuẩn V2.1.',
    imageUrl: sample3Svg,
  },
  {
    id: 'sample-error-layout',
    title: 'Mẫu Lỗi Thử Nghiệm',
    subtitle: 'Đứt Đoạn Eo & Nặng Tà (Vi phạm điều cấm)',
    tag: 'Minh Họa Lỗi',
    description: 'Bố cục đứt đoạn ở eo, màu nóng bão hòa cao ở vùng bụng làm phình vòng 2, tà dưới dày đặc hơn ngực làm dìm dáng người mặc.',
    imageUrl: sample4Svg,
  },
];
