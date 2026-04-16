const { useState, useEffect } = React;

const App = () => {
  // Pengaturan Statis (Tersimpan di Browser agar tidak perlu ketik ulang)
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('ibr_digital_v5');
    return saved ? JSON.parse(saved) : {
      headerName: 'PT. INDO-BHARAT RAYON',
      headerOffice: 'Menara Batavia, 16th Floor, Jl. K.H. Mas Mansyur Kav 126\nJakarta 10220, Indonesia',
      headerContact: 'Telp: 62-21-5722452 Fax: 62-21-5722417 e-mail: jktoff.ibr@adityabirla.com',
      npwp: '01.002.087.3-092.000',
      factoryInfo: 'Factory Address : Desa Cilangkap, Curug, Purwakarta, 41101, PO Box No 9, Jawa Barat, Indonesia.\nPhone : +62-264-202041, Fax : +62-264-201349, Email : factory.ibr@adityabirla.com',
      footerName: 'PT. INDO-BHARAT RAYON',
      // Jika file ada di GitHub, cukup tulis nama filenya saja di sini
      logo1: 'logo-aditya.png', 
      logo2: 'logo-birla.png',
      logo3: 'logo-iso-bv.png',
      logo4: 'logo-iso-2.png'
    };
  });

  const [data, setData] = useState({
    doNo: '',
    date: new Date().toISOString().split('T')[0],
    refScNo: '',
    toName: '',
    toAddress: '',
    toNpwp: '',
    toTelp: '',
    toFax: '',
    truckNo: '',
    driverName: '',
    description: 'GRADE B1 PRODUCT',
    fullWeight: '',
    emptyWeight: '',
  });

  const [netWeight, setNetWeight] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const full = parseFloat(data.fullWeight) || 0;
    const empty = parseFloat(data.emptyWeight) || 0;
    setNetWeight(full - empty > 0 ? full - empty : 0);
  }, [data.fullWeight, data.emptyWeight]);

  const saveConfig = () => {
    localStorage.setItem('ibr_digital_v5', JSON.stringify(config));
    setShowSettings(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfig = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const formatKg = (val) => {
    if (!val || val === '0' || val === 0) return "";
    return parseFloat(val).toLocaleString('id-ID') + " KG";
  };

  return (
    <div className="min-h-screen bg-slate-200 p-4 md:p-8 font-sans text-slate-900">
      
      {/* Top Navigation */}
      <div className="max-w-[1100px] mx-auto flex justify-between items-center bg-white p-4 rounded-xl shadow-lg mb-6 no-print border border-slate-300">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-700 p-2 rounded-lg text-white font-black text-xl italic">IBR</div>
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest text-slate-800 leading-none">DO Digital System</h1>
            <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-tighter">Corporate Standard Edition</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowSettings(!showSettings)} className="px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2">
            Settings
          </button>
          <button onClick={() => window.print()} className="px-6 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-black flex items-center gap-2 transition-all active:scale-95">
            Cetak PDF
          </button>
        </div>
      </div>

      <div className="max-w-[1250px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Side */}
        {!showSettings && (
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-xl border border-slate-200 no-print space-y-4 animate-in fade-in slide-in-from-left-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b pb-2 mb-4 italic">Input Pengiriman</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <input type="text" name="doNo" placeholder="No. DO" onChange={handleInput} className="border-b-2 p-2 text-sm focus:border-indigo-600 outline-none font-bold" />
              <input type="date" name="date" value={data.date} onChange={handleInput} className="border-b-2 p-2 text-sm focus:border-indigo-600 outline-none" />
            </div>

            <input type="text" name="toName" placeholder="M/S PT. PENERIMA" onChange={handleInput} className="w-full border-b-2 p-2 text-sm font-black text-indigo-800 uppercase" />
            <textarea name="toAddress" placeholder="Alamat Tujuan" onChange={handleInput} className="w-full border-b-2 p-2 text-sm h-20 leading-tight" rows="3"></textarea>
            
            <div className="grid grid-cols-2 gap-3">
              <input type="text" name="truckNo" placeholder="No. Polisi" onChange={handleInput} className="border-b-2 p-2 text-sm font-bold uppercase" />
              <input type="text" name="driverName" placeholder="Nama Sopir" onChange={handleInput} className="border-b-2 p-2 text-sm font-bold uppercase" />
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4 shadow-inner">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider italic">Data Timbangan (KG)</h4>
              <div className="grid grid-cols-2 gap-3">
                <input type="number" name="fullWeight" placeholder="Truk Isi" onChange={handleInput} className="p-3 border rounded-lg text-lg font-bold bg-white text-indigo-700 shadow-sm" />
                <input type="number" name="emptyWeight" placeholder="Kosong" onChange={handleInput} className="p-3 border rounded-lg text-lg font-bold bg-white text-slate-400 shadow-sm" />
              </div>
              <div className="flex justify-between items-center p-3 bg-indigo-700 rounded-lg text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest">Berat Netto :</span>
                <span className="text-xl font-black">{netWeight.toLocaleString('id-ID')} KG</span>
              </div>
            </div>
          </div>
        )}

        {/* Settings Side */}
        {showSettings && (
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-xl border-t-4 border-indigo-700 no-print space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
             <h3 className="text-xs font-black uppercase tracking-widest text-slate-700">Konfigurasi Perusahaan</h3>
             <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Daftar Logo (Gunakan Nama File)</p>
                <div className="grid grid-cols-2 gap-2">
                    <input type="text" name="logo1" value={config.logo1} onChange={handleConfig} className="p-2 text-xs border rounded" placeholder="Top Left Logo" />
                    <input type="text" name="logo2" value={config.logo2} onChange={handleConfig} className="p-2 text-xs border rounded" placeholder="Top Right Logo" />
                    <input type="text" name="logo3" value={config.logo3} onChange={handleConfig} className="p-2 text-xs border rounded" placeholder="Bottom Left" />
                    <input type="text" name="logo4" value={config.logo4} onChange={handleConfig} className="p-2 text-xs border rounded" placeholder="Bottom Right" />
                </div>
                <p className="text-[8px] text-slate-400 italic">*Jika file diunggah ke GitHub, cukup ketik nama filenya (ex: logo.png)</p>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Nama Perusahaan Utama</label>
                <input type="text" name="headerName" value={config.headerName} onChange={handleConfig} className="w-full p-2 border rounded text-xs font-bold" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Alamat Kantor & Kontak</label>
                <textarea name="headerOffice" value={config.headerOffice} onChange={handleConfig} className="w-full p-2 border rounded text-xs" rows="2"></textarea>
                <input type="text" name="headerContact" value={config.headerContact} onChange={handleConfig} className="w-full p-2 border rounded text-xs mt-1" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">NPWP</label>
                <input type="text" name="npwp" value={config.npwp} onChange={handleConfig} className="w-full p-2 border rounded text-xs" />
             </div>
             <button onClick={saveConfig} className="w-full py-4 bg-indigo-700 text-white font-black uppercase text-[10px] tracking-widest rounded-xl shadow-lg hover:bg-indigo-800 transition-all">
                Simpan Konfigurasi
             </button>
          </div>
        )}

        {/* PRIVEW A4 (PRINT AREA) */}
        <div className="lg:col-span-8 flex justify-center bg-slate-500 p-4 md:p-12 rounded-2xl shadow-inner border-[6px] border-slate-600 overflow-auto">
          <div 
            id="print-area" 
            className="bg-white p-[12mm] text-black shadow-2xl print:m-0 font-sans leading-tight relative"
            style={{ width: '210mm', minHeight: '297mm', boxSizing: 'border-box' }}
          >
            
            {/* Kop Surat Header */}
            <div className="flex justify-between items-start mb-2">
              <div className="w-24 h-20 flex items-center justify-center overflow-hidden">
                 <img src={config.logo1} className="max-w-full max-h-full object-contain" onError={(e) => e.target.style.opacity = '0'} />
              </div>
              <div className="text-center flex-1 px-4">
                <h1 className="text-[15pt] font-black uppercase tracking-tight mb-0.5 leading-none">{config.headerName}</h1>
                <p className="text-[8.5pt] whitespace-pre-line leading-[1.2]">{config.headerOffice}</p>
                <p className="text-[8.5pt] leading-[1.2] mt-0.5 italic">{config.headerContact}</p>
                <p className="font-black text-[9.5pt] tracking-[0.2em] mt-3 border-t-2 border-black inline-block pt-1 uppercase">NPWP NO: {config.npwp}</p>
              </div>
              <div className="w-24 h-20 flex items-center justify-center overflow-hidden">
                 <img src={config.logo2} className="max-w-full max-h-full object-contain" onError={(e) => e.target.style.opacity = '0'} />
              </div>
            </div>

            <h2 className="text-center text-[13pt] font-black underline mb-6 tracking-[0.4em] uppercase py-2">DELIVERY ORDER</h2>

            {/* Layout Detail Atas */}
            <div className="flex mb-4">
              <div className="w-[62%] text-[10pt]">
                <table className="w-full border-separate border-spacing-y-1">
                  <tbody>
                    <tr className="align-top">
                      <td className="w-14 py-1">To :</td>
                      <td className="font-black border-b border-black uppercase py-1">{data.toName || "M/S PT. ....................................................."}</td>
                    </tr>
                    <tr className="align-top">
                      <td></td>
                      <td className="h-[55px] leading-tight py-1 whitespace-pre-line text-[9pt]">{data.toAddress || "..........................................................................."}</td>
                    </tr>
                    <tr>
                      <td className="pt-2">NPWP :</td>
                      <td className="pt-2">{data.toNpwp || "......................................................................."}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="pt-8 font-medium">
                        By Truck No : <span className="font-bold border-b-2 border-black px-4">{data.truckNo || "...................."}</span> 
                        <span className="ml-8">Driver Name : <span className="font-bold border-b-2 border-black px-4">{data.driverName || "...................."}</span></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-[38%] pl-6">
                <div className="border-[2pt] border-black p-4 text-[10pt] leading-loose">
                  <div className="flex justify-between border-b border-black mb-1"><span>DO. No</span> <span>: <strong>{data.doNo}</strong></span></div>
                  <div className="flex justify-between border-b border-black mb-1"><span>Date</span> <span>: {data.date}</span></div>
                  <div className="flex justify-between border-b border-black"><span>Ref. S.C. No</span> <span>: {data.refScNo || "-"}</span></div>
                  <div className="h-6"></div>
                </div>
              </div>
            </div>

            {/* Tabel Utama Barang */}
            <div className="border-[2.5pt] border-black">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-[2.5pt] border-black text-center text-[10pt] font-black uppercase bg-slate-50 h-12">
                    <th className="border-r-[2.5pt] border-black w-[65%] tracking-[0.1em]">Description of Goods</th>
                    <th className="tracking-[0.1em]">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-8 h-[400px] align-top relative border-r-[2.5pt] border-black">
                      <div className="font-black text-[12pt] uppercase mb-12 tracking-tight underline underline-offset-4">{data.description}</div>
                      
                      {/* Truck Details Digital Layer */}
                      <div className="absolute bottom-12 left-8 text-[10pt] space-y-3 uppercase leading-none font-bold">
                        <p className="font-black underline italic mb-4 text-[9pt] tracking-widest text-slate-500">TRUCK DETAILS:</p>
                        <div className="flex w-[400px] justify-between">
                          <span>ACTUAL WEIGHT FULL TRUCK</span>
                          <span className="text-right"> = &nbsp;&nbsp; {formatKg(data.fullWeight)}</span>
                        </div>
                        <div className="flex w-[400px] justify-between border-b-[1.5pt] border-black pb-2 mb-2">
                          <span>ACTUAL WEIGHT EMPTY TRUCK</span>
                          <span className="text-right"> = &nbsp;&nbsp; {formatKg(data.emptyWeight)}</span>
                        </div>
                        <div className="flex w-[400px] justify-between mt-6 pt-4 border-t-[2.5pt] border-black font-black text-[14pt]">
                          <span>NET WEIGHT</span>
                          <span className="text-right"> = &nbsp;&nbsp; {formatKg(netWeight)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-8 text-right align-top font-black text-[13pt] pt-14">
                      {formatKg(netWeight)}
                    </td>
                  </tr>
                  <tr className="border-t-[2.5pt] border-black bg-slate-50 h-14 font-black">
                    <td className="text-right pr-10 uppercase text-[11pt] tracking-widest border-r-[2.5pt] border-black italic">Total :</td>
                    <td className="text-right pr-8 text-[13pt]">{formatKg(netWeight)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer Signature Box */}
            <div className="mt-6">
              <table className="w-full border-[2pt] border-black text-[10pt] border-collapse font-bold">
                <tbody>
                  <tr className="h-36">
                    <td className="w-1/4 border-r-2 border-black p-4 align-top text-center relative">
                      Prepared by ...........................
                      <div className="absolute bottom-6 left-0 right-0 border-t-2 border-black pt-3 mx-2 text-[9pt]">Checked by ...........................</div>
                    </td>
                    <td className="w-[30%] border-r-2 border-black p-5 align-middle text-center italic leading-snug">
                      Material received<br/>in good Condition by :<br/><br/>
                      ..................................................
                    </td>
                    <td className="w-[45%] p-4 align-top text-center uppercase italic">
                      For {config.footerName || config.headerName}<br/>
                      <div className="h-24"></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Factory Address & ISO (Bottom Section) */}
            <div className="mt-12 pt-3 border-t-2 border-black text-center text-[8.5pt] leading-relaxed font-black text-slate-500 uppercase tracking-tighter">
              <p className="whitespace-pre-line tracking-tight">{config.factoryInfo}</p>
            </div>

            {/* Bottom Certifications Logos Area */}
            <div className="absolute bottom-[10mm] left-[12mm] right-[12mm] flex justify-between items-end">
              <div className="w-52 h-16 flex items-center justify-start opacity-90 transition-all">
                <img src={config.logo3} className="max-w-full max-h-full object-contain" onError={(e) => e.target.style.opacity = '0'} />
              </div>
              <div className="text-[9pt] font-black italic mb-2 text-slate-400">
                Print Dated : {new Date().toLocaleDateString('id-ID', {day: '2-digit', month: '2-digit', year: 'numeric'})}
              </div>
              <div className="w-52 h-16 flex items-center justify-end opacity-90 transition-all">
                <img src={config.logo4} className="max-w-full max-h-full object-contain" onError={(e) => e.target.style.opacity = '0'} />
              </div>
            </div>

          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; padding: 0 !important; }
          .max-w-full { max-width: 100% !important; margin: 0 !important; }
          .lg\\:grid-cols-12 { grid-template-cols: 1fr !important; }
          .lg\\:col-span-8 { background: none !important; padding: 0 !important; width: 100% !important; border: none !important; }
          #print-area { 
            border: none !important; 
            box-shadow: none !important; 
            padding: 0 !important; 
            width: 210mm !important; 
            margin: 0 auto !important; 
            position: relative;
          }
          @page { 
            size: A4; 
            margin: 15mm; 
          }
        }
      `}} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);