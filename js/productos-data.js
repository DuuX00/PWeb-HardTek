const productos = {
    laptops: [
        {
            id: "1",
            nombre: "LAPTOP DELL LATITUDE 3520",
            descripcion: "INTEL CORE i7-1165G7 I 15.6″ I 8GB DDR4 I 512 GB SSD I 2GB GDDR5",
            precio: "3500.00",
            imagen: "img/lap1.jpg"
        },
        {
            id: "2",
            nombre: "LAPTOP ASUS X515EA-EJ920 CI3-1115G4",
            descripcion: "LAPTOP ASUS X515EA-EJ920 CI3-1115G4 256GB SSD 8GB 15.6 FHD",
            precio: "1338.00",
            imagen: "img/laptop2.jpg"
        },
        {
            id: "3",
            nombre: "LAPTOP WS HP ZBook Power",
            descripcion: "Core i9-13900H HP ZBook Power G10 16GB I 1TB SSD I 15.6″ I NVIDIA RTX 2000 8GB W11PRO",
            precio: "12190.00",
            imagen: "img/laptop3.png"
        },
        {
            id: "4",
            nombre: "LAPTOP LENOVO 15ITL05",
            descripcion: "LAPTOP LENOVO I7-1165G7 15ITL05 I15.6″ I 12GB DDR4 I 512GB SSD",
            precio: "2893.00",
            imagen: "img/laptop2.jpg"
        },

          {
            id: "5",
            nombre: "LAPTOP GAMER MSI GF63",
            descripcion: "Intel Core i5-11400H | 15.6\" FHD | 8GB DDR4 | 512GB SSD | NVIDIA GeForce RTX 3050",
            precio: "3899.00",
            imagen: "img/laptop_msi.jpg"
        },
        {
            id: "6",
            nombre: "LAPTOP ACER ASPIRE 5",
            descripcion: "AMD Ryzen 5 5500U | 15.6\" FHD | 8GB DDR4 | 256GB NVMe SSD | AMD Radeon Graphics",
            precio: "2150.00",
            imagen: "img/laptop_acer.jpg"
        },
        {
            id: "7",
            nombre: "MACBOOK AIR M1",
            descripcion: "Chip M1 de Apple con CPU de 8 núcleos | 13.3\" Retina | 8GB RAM | 256GB SSD",
            precio: "4500.00",
            imagen: "img/macbook_air.jpg"
        },
        {
            id: "8",
            nombre: "LAPTOP HP PAVILION 15",
            descripcion: "Intel Core i7-1255U | 15.6\" FHD | 16GB DDR4 | 1TB SSD | Intel Iris Xe Graphics",
            precio: "3200.00",
            imagen: "img/laptop_hp.jpg"
        },
        {
            id: "9",
            nombre: "LAPTOP GAMER GIGABYTE G5",
            descripcion: "Intel Core i5-12500H | 15.6\" 144Hz | 16GB DDR4 | 512GB SSD | NVIDIA GeForce RTX 4060",
            precio: "4999.00",
            imagen: "img/laptop_gigabyte.jpg"
        }
    ],
    pcs: [
        {
            id: "201",
            nombre: "COMPUTADORA INTEL CORE I7-12va I 1TB M.2 I 16GB I 24",
            descripcion: "Intel® Core™ i7-12700 1.60/4.90 GHz,LGA1700 GIGABYTE H610M S2H V2 DDR4 SSD KINGSTON M.2 PCIE4.0 1TB",
            precio: "2814.00",
            imagen: "img/pcgamer1.png"
        },
        {
            id: "202",
            nombre: "Intel Core i5-13400 LGA1700",
            descripcion: "Intel Core i5-13400 LGA1700,10 núcleos GIGABYTE H610M S2H V2 DDR4  500GB Ram 16GB DDR4 3200 MHz PC4",
            precio: "2170.00",
            imagen: "img/pcgamer2.png"
        },
        {
            id: "203",
            nombre: "COMPUTADORA INTEL CORE I5-12va I 512GB M.2 I 8GB I 22",
            descripcion: "Intel® Core™ i5-12400 LGA1200 GIGABYTE H610M S2H V2 DDR4 SSD KINGSTON NV2 NVMe PCIe 4.0 500GB Ram 8GB, DDR4-3200MHz.",
            precio: "1952.68",
            imagen: "img/pcgamer3.jpg"
        },
        {
            id: "204",
            nombre: "LENOVO- THINKCENTRE M720S",
            descripcion: "INTEL CORE i7 9700 3.00 GHz 12 MB L3 LGA1151 INTEL.",
            precio: "4300.00",
            imagen: "img/pc4.png"
        },
         
        {
            id: "205",
            nombre: "PC GAMER AMD RYZEN 5 5600G",
            descripcion: "AMD Ryzen 5 5600G | Gráficos Radeon Vega 7 | 16GB DDR4 3200MHz | 500GB M.2 SSD",
            precio: "1850.00",
            imagen: "img/pc_ryzen5.png"
        },
        {
            id: "206",
            nombre: "PC ALTO RENDIMIENTO RYZEN 7",
            descripcion: "AMD Ryzen 7 7800X3D | Placa B650 | 32GB DDR5 | 1TB NVMe Gen4 SSD | Sin Gráfica",
            precio: "3500.00",
            imagen: "img/pc_ryzen7.png"
        },
        {
            id: "207",
            nombre: "COMPUTADORA INTEL CORE I9-13900K",
            descripcion: "Intel Core i9-13900K | Placa Z790 | 32GB DDR5 | 2TB M.2 SSD | RTX 4070 Ti",
            precio: "14500.00",
            imagen: "img/pc_intel_i9.png"
        },
        {
            id: "208",
            nombre: "PC DE ENTRADA INTEL I3",
            descripcion: "Intel Core i3-12100F | Placa H610M | 16GB DDR4 | 480GB SSD | GTX 1650 4GB",
            precio: "1550.00",
            imagen: "img/pc_intel_i3.png"
        },
        {
            id: "209",
            nombre: "WORKSTATION LENOVO THINKSTATION",
            descripcion: "Intel Xeon W-2223 | 32GB DDR4 ECC | 1TB NVMe SSD | NVIDIA Quadro T1000 8GB",
            precio: "9800.00",
            imagen: "img/pc_workstation.png"
        }

    ],
    ram: [
        {
            id: "301",
            nombre: "MEMORIA KINGSTON HYPER FURY BLUE",
            descripcion: "MEMORIA KINGSTON HYPER FURY BLUE 8GB DDR31600 MHz",
            precio: "195.00",
            imagen: "img/ram4.jpg"
        },
        {
            id: "302",
            nombre: "MEMORIA CORSAIR",
            descripcion: "MEMORIA CORSAIR VENGANCE 8GB 1.60GHZ DDR3.",
            precio: "228.00",
            imagen: "img/ram3.jpg"
        },
        {
            id: "303",
            nombre: "MEMORIA KINGSTON FURY BEAST",
            descripcion: "MEMORIA KINGSTON FURY BEAST, 8GB DDR4-3200MHz.",
            precio: "125.00",
            imagen: "img/ram2.png"
        },
        {
            id: "304",
            nombre: "MEMORIA HP 16GB DDR4 SODIMM 2666 MHz",
            descripcion: "MEMORIA HP 16GB DDR4 SODIMM 2666 MHz",
            precio: "150.00",
            imagen: "img/ram1.jpg"
        },
        {
            id: "305",
            nombre: "MEMORIA CRUCIAL PRO 16GB DDR4",
            descripcion: "MEMORIA CRUCIAL PRO 16GB (2x8GB) DDR4 3200MHz",
            precio: "210.00",
            imagen: "img/ram_crucial.jpg"
        },
        {
            id: "306",
            nombre: "MEMORIA G.SKILL TRIDENT Z5 RGB 32GB DDR5",
            descripcion: "G.SKILL TRIDENT Z5 RGB 32GB (2x16GB) DDR5 6000MHz CL36",
            precio: "650.00",
            imagen: "img/ram_gskill.jpg"
        },
        {
            id: "307",
            nombre: "MEMORIA CORSAIR VENGEANCE LPX 16GB DDR4",
            descripcion: "CORSAIR VENGEANCE LPX 16GB (2x8GB) DDR4 3600MHz",
            precio: "250.00",
            imagen: "img/ram_corsair_lpx.jpg"
        },
        {
            id: "308",
            nombre: "MEMORIA TEAMGROUP T-FORCE VULCAN Z 16GB",
            descripcion: "TEAMGROUP T-FORCE VULCAN Z 16GB (2x8GB) DDR4 3200MHz",
            precio: "190.00",
            imagen: "img/ram_teamgroup.jpg"
        },
        {
            id: "309",
            nombre: "MEMORIA KINGSTON FURY BEAST 32GB DDR5",
            descripcion: "KINGSTON FURY BEAST 32GB (2x16GB) DDR5 5200MHz",
            precio: "580.00",
            imagen: "img/ram_fury_ddr5.jpg"
        }
    ],
    hdd: [
        {
            id: "401",
            nombre: "SSD KINGSTON NV2",
            descripcion: "Unidad de estado sólido de 250GB con interfaz SATA III.",
            precio: "170.00",
            imagen: "img/hdd1.png"
        },
        {
            id: "402",
            nombre: "WESTERN DIGITAL",
            descripcion: "SSD WD SN350 2TB VERDE NVME.",
            precio: "472.50",
            imagen: "img/ssd2.png"
        },
        {
            id: "403",
            nombre: "SK HYNIX",
            descripcion: "SSD WD SN350 2TB VERDE NVME",
            precio: "283.50",
            imagen: "img/hdd3.jpg"
        },
        {
            id: "404",
            nombre: "WESTERN DIGITAL",
            descripcion: "DISCO DURO WD 1TB SATA 6GB/s WD10EZEX.",
            precio: "231.00",
            imagen: "img/hdd4.jpg"
        },
        {
            id: "405",
            nombre: "SSD SAMSUNG 980 PRO 1TB",
            descripcion: "SSD SAMSUNG 980 PRO 1TB PCIe 4.0 NVMe M.2",
            precio: "550.00",
            imagen: "img/ssd_samsung.png"
        },
        {
            id: "406",
            nombre: "HDD SEAGATE BARRACUDA 2TB",
            descripcion: "Disco Duro Interno Seagate Barracuda 2TB 3.5'' SATA 7200RPM",
            precio: "280.00",
            imagen: "img/hdd_seagate.jpg"
        },
        {
            id: "407",
            nombre: "SSD CRUCIAL MX500 1TB",
            descripcion: "Unidad de estado sólido Crucial MX500 1TB SATA 2.5''",
            precio: "350.00",
            imagen: "img/ssd_crucial.png"
        },
        {
            id: "408",
            nombre: "SSD ADATA LEGEND 800 1TB",
            descripcion: "SSD ADATA LEGEND 800 1TB PCIe Gen4 x4 NVMe M.2",
            precio: "390.00",
            imagen: "img/ssd_adata.png"
        },
        {
            id: "409",
            nombre: "HDD TOSHIBA P300 1TB",
            descripcion: "Disco Duro Interno Toshiba P300 1TB 3.5'' SATA 7200RPM",
            precio: "210.00",
            imagen: "img/hdd_toshiba.jpg"
        }
    ]
};

const categorias = [
    {
        id: 'laptops',
        nombre: 'Laptops',
        descripcion: 'Gran variedad de laptops para todas tus necesidades: gaming, trabajo, estudio.',
        imagen: 'img/laptop3.png'
    },
    {
        id: 'pcs',
        nombre: 'PCs Gamer',
        descripcion: 'Arma tu PC de ensueño con nuestros componentes de alto rendimiento.',
        imagen: 'img/pcgamer1.png'
    },
    {
        id: 'hdd',
        nombre: 'Discos Duros',
        descripcion: 'Explora nuestra amplia selección de productos desde discos de estado sólido de 1TB, discos duros HDD,discos duros SSD M.2 entre otros ...',
        imagen: 'img/hdd1.png'
    },
    {
        id: 'ram',
        nombre: 'Memorias RAM',
        descripcion: 'Memorias Ram para Pc Gamer, Pc de oficina, Pc para estudiantes, contamos con amplio stock de la mejores marcas del mercado de computo.',
        imagen: 'img/ram3.jpg'
    },
    {
        id: 'redes',
        nombre: 'Implementación de Redes',
        descripcion: 'Soluciones completas para redes empresariales y oficinas.',
        imagen: 'img/redes.jpg',
        externo: true,
        url: 'https://wa.me/'
    }
];