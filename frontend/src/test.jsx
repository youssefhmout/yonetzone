import React, { useState, useEffect } from 'react';

export default function AjouterAbonnement() {
  const [step, setStep] = useState(1);
  
  // États du formulaire
  const [client, setClient] = useState('');
  const [type, setType] = useState('mensuel');
  const [prix_initial, setPrix_initial] = useState('100');
  const [prix_renouvellement, setPrix_renouvellement] = useState('90');
  const [date_debut, setDate_debut] = useState('');
  const [duree, setDuree] = useState('1');
  
  // États للأخطاء والتحميل
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // بيانات وهمية للعملاء
  const [clients] = useState([
    { id: 1, nom_complet: 'عمر أحمد', email: 'omar@example.com', telephone: '0601234567' },
    { id: 2, nom_complet: 'سارة محمد', email: 'sara@example.com', telephone: '0602345678' },
    { id: 3, nom_complet: 'يوسف الحسن', email: 'youssef@example.com', telephone: '0603456789' },
    { id: 4, nom_complet: 'فاطمة الزهراء', email: 'fatima@example.com', telephone: '0604567890' },
    { id: 5, nom_complet: 'علي كريم', email: 'ali@example.com', telephone: '0605678901' },
  ]);
  
  // بيانات وهمية للخدمات
  const [services] = useState([
    { id: 1, nom: 'الإنترنت السريع', type: 'mensuel', prix: '150' },
    { id: 2, nom: 'الباقة الذهبية', type: 'annuel', prix: '1500' },
    { id: 3, nom: 'خدمة التخزين', type: 'mensuel', prix: '50' },
  ]);
  
  // تعيين التاريخ الحالي كتاريخ بدء افتراضي
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDate_debut(formattedDate);
  }, []);
  
  // التحقق من البيانات في كل خطوة
  const validateStep = (stepNumber) => {
    const newErrors = {};
    
    switch(stepNumber) {
      case 1:
        if (!client) newErrors.client = 'الرجاء اختيار عميل';
        break;
        
      case 2:
        if (!prix_initial || prix_initial <= 0) newErrors.prix_initial = 'السعر الأولي غير صحيح';
        if (!prix_renouvellement || prix_renouvellement <= 0) newErrors.prix_renouvellement = 'سعر التجديد غير صحيح';
        break;
        
      case 3:
        if (!date_debut) newErrors.date_debut = 'الرجاء تحديد تاريخ البداية';
        if (!duree || duree < 1) newErrors.duree = 'المدة غير صحيحة';
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // الانتقال للخطوة التالية
  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      setMessage({ type: '', text: '' });
    }
  };
  
  // العودة للخطوة السابقة
  const handleBack = () => {
    setStep(step - 1);
    setMessage({ type: '', text: '' });
  };
  
  // تأكيد وإنشاء الاشتراك
  const handleConfirm = () => {
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);
    
    // محاكاة عملية الإرسال
    setTimeout(() => {
      // بيانات الاشتراك المراد إنشاؤها
      const abonnementData = {
        id: Date.now(), // ID فريد
        client_id: parseInt(client),
        client_nom: clients.find(c => c.id.toString() === client)?.nom_complet || '',
        type: type,
        prix_initial: parseFloat(prix_initial),
        prix_renouvellement: parseFloat(prix_renouvellement),
        date_debut: date_debut,
        duree: parseInt(duree),
        date_fin: calculateDateFin(),
        statut: 'active',
        created_at: new Date().toISOString()
      };
      
      // عرض البيانات في الكونسول (بدلاً من إرسالها لـ API)
      console.log('✅ بيانات الاشتراك:', abonnementData);
      
      // إظهار رسالة النجاح
      setMessage({
        type: 'success',
        text: `تم إنشاء الاشتراك بنجاح للعميل ${abonnementData.client_nom}`
      });
      
      setIsSubmitting(false);
      
      // إعادة تعيين النموذج بعد 3 ثواني
      setTimeout(() => {
        resetForm();
        setMessage({ type: '', text: '' });
      }, 3000);
      
    }, 1500); // تأخير لمحاكاة الإرسال
  };
  
  // حساب تاريخ الانتهاء
  const calculateDateFin = () => {
    if (!date_debut || !duree) return '';
    
    const startDate = new Date(date_debut);
    if (type === 'mensuel') {
      startDate.setMonth(startDate.getMonth() + parseInt(duree));
    } else {
      startDate.setFullYear(startDate.getFullYear() + parseInt(duree));
    }
    
    return startDate.toISOString().split('T')[0];
  };
  
  // تنسيق التاريخ للعرض
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-MA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // إعادة تعيين النموذج
  const resetForm = () => {
    setStep(1);
    setClient('');
    setType('mensuel');
    setPrix_initial('100');
    setPrix_renouvellement('90');
    setDuree('1');
    const today = new Date();
    setDate_debut(today.toISOString().split('T')[0]);
    setErrors({});
  };
  
  // اختيار خدمة من القائمة
  const handleServiceSelect = (service) => {
    setType(service.type);
    setPrix_initial(service.prix);
    setPrix_renouvellement((service.prix * 0.9).toString()); // خصم 10% للتجديد
  };
  
  // العميل المختار
  const selectedClient = clients.find(c => c.id.toString() === client);
  
  // تاريخ الانتهاء المحسوب
  const dateFin = calculateDateFin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8 font-cairo">
      <div className="max-w-4xl mx-auto">
        
        {/* الرسائل */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl text-center ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message.text}
          </div>
        )}
        
        {/* العنوان الرئيسي */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            إضافة اشتراك جديد
          </h1>
          <p className="text-gray-600">
            اتبع الخطوات لإنشاء اشتراك مخصص
          </p>
        </div>
        
        {/* مؤشر التقدم */}
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 -z-10"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 -z-10 transition-all duration-300" 
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>
          
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center relative">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold
                ${step >= s 
                  ? 'bg-blue-600 shadow-lg shadow-blue-200' 
                  : 'bg-gray-300'
                }
              `}>
                {s}
              </div>
              <span className={`
                mt-2 text-sm font-medium
                ${step >= s ? 'text-blue-600' : 'text-gray-500'}
              `}>
                {s === 1 ? 'العميل' : s === 2 ? 'الإعدادات' : 'التأكيد'}
              </span>
            </div>
          ))}
        </div>
        
        {/* الخطوة 1: اختيار العميل */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 animate-fadeIn">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  ١
                </div>
                اختيار العميل
              </h2>
              <p className="text-gray-600">اختر العميل للاشتراك</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اختر عميلاً
                  <span className="text-red-500 mr-1">*</span>
                </label>
                <div className="relative">
                  <select 
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className={`
                      w-full px-4 py-3 rounded-xl border bg-white focus:border-blue-500 
                      focus:ring-2 focus:ring-blue-200 outline-none transition-all 
                      appearance-none pr-10 hover:border-gray-400 text-right
                      ${errors.client ? 'border-red-300' : 'border-gray-300'}
                    `}
                  >
                    <option value="" className="text-gray-400 text-right">
                      -- اختر عميلا --
                    </option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id} className="py-2 text-right">
                        {c.nom_complet} - {c.telephone}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.client && (
                  <p className="mt-1 text-sm text-red-600 text-right">{errors.client}</p>
                )}
              </div>
              
              {/* معاينة بيانات العميل */}
              {selectedClient && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <h4 className="font-semibold text-gray-800">{selectedClient.nom_complet}</h4>
                      <p className="text-sm text-gray-600">{selectedClient.email}</p>
                      <p className="text-sm text-gray-600">{selectedClient.telephone}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end pt-4">
                <button 
                  disabled={!client}
                  onClick={handleNext}
                  className={`
                    px-8 py-3 rounded-xl font-medium transition-all duration-300 
                    flex items-center gap-2
                    ${!client
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl shadow-blue-200 hover:shadow-blue-300'
                    }
                  `}
                >
                  التالي
                  <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* الخطوة 2: إعدادات الاشتراك */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  ٢
                </div>
                إعدادات الاشتراك
              </h2>
              <p className="text-gray-600">حدد خصائص الاشتراك</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">الخدمات المتاحة</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServiceSelect(service)}
                    className={`p-4 rounded-xl border-2 text-right transition-all duration-300 ${
                      type === service.type && prix_initial === service.prix
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium">{service.nom}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {service.type === 'mensuel' ? 'شهري' : 'سنوي'}
                    </div>
                    <div className="text-lg font-bold mt-2">{service.prix} درهم</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  نوع الاشتراك
                  <span className="text-red-500 mr-1">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setType('mensuel')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-right ${
                      type === 'mensuel'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium">شهري</div>
                    <div className="text-sm text-gray-500 mt-1">تجديد شهري</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('annuel')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-right ${
                      type === 'annuel'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium">سنوي</div>
                    <div className="text-sm text-gray-500 mt-1">تجديد سنوي</div>
                  </button>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    السعر الأولي (درهم)
                    <span className="text-red-500 mr-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={prix_initial}
                      onChange={(e) => setPrix_initial(e.target.value)}
                      className={`
                        w-full pr-12 pl-4 py-3 rounded-xl border focus:border-blue-500 
                        focus:ring-2 focus:ring-blue-200 outline-none transition-all text-right
                        ${errors.prix_initial ? 'border-red-300' : 'border-gray-300'}
                      `}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      درهم
                    </div>
                  </div>
                  {errors.prix_initial && (
                    <p className="mt-1 text-sm text-red-600 text-right">{errors.prix_initial}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    سعر التجديد (درهم)
                    <span className="text-red-500 mr-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={prix_renouvellement}
                      onChange={(e) => setPrix_renouvellement(e.target.value)}
                      className={`
                        w-full pr-12 pl-4 py-3 rounded-xl border focus:border-blue-500 
                        focus:ring-2 focus:ring-blue-200 outline-none transition-all text-right
                        ${errors.prix_renouvellement ? 'border-red-300' : 'border-gray-300'}
                      `}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      درهم
                    </div>
                  </div>
                  {errors.prix_renouvellement && (
                    <p className="mt-1 text-sm text-red-600 text-right">{errors.prix_renouvellement}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-6 border-t border-gray-100">
              <button 
                onClick={handleNext}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-lg hover:shadow-xl shadow-blue-200 hover:shadow-blue-300 transition-all duration-300 flex items-center gap-2"
              >
                التالي
                <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <button 
                onClick={handleBack}
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                الرجوع
              </button>
            </div>
          </div>
        )}
        
        {/* الخطوة 3: التأكيد */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  ٣
                </div>
                تأكيد الاشتراك
              </h2>
              <p className="text-gray-600">راجع المعلومات وأكد الإنشاء</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* تفاصيل الاشتراك */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2 text-right">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    تفاصيل الاشتراك
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-800 text-left">
                        {type === 'mensuel' ? 'شهري' : 'سنوي'}
                      </span>
                      <span className="text-gray-600 text-right">النوع</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-800 text-left">
                        {parseFloat(prix_initial).toFixed(2)} <span className="text-gray-600">درهم</span>
                      </span>
                      <span className="text-gray-600 text-right">السعر الأولي</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-800 text-left">
                        {parseFloat(prix_renouvellement).toFixed(2)} <span className="text-gray-600">درهم</span>
                      </span>
                      <span className="text-gray-600 text-right">سعر التجديد</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-800 text-left">
                        {selectedClient?.nom_complet || 'غير محدد'}
                      </span>
                      <span className="text-gray-600 text-right">العميل</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* التاريخ والمدة */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    تاريخ البداية
                    <span className="text-red-500 mr-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date_debut}
                      onChange={(e) => setDate_debut(e.target.value)}
                      className={`
                        w-full px-4 py-3 rounded-xl border focus:border-blue-500 
                        focus:ring-2 focus:ring-blue-200 outline-none transition-all text-right
                        ${errors.date_debut ? 'border-red-300' : 'border-gray-300'}
                      `}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  {errors.date_debut && (
                    <p className="mt-1 text-sm text-red-600 text-right">{errors.date_debut}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    المدة {type === "mensuel" ? "(أشهر)" : "(سنوات)"}
                    <span className="text-red-500 mr-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={duree}
                      onChange={(e) => setDuree(e.target.value)}
                      className={`
                        w-full px-4 py-3 rounded-xl border focus:border-blue-500 
                        focus:ring-2 focus:ring-blue-200 outline-none transition-all text-right
                        ${errors.duree ? 'border-red-300' : 'border-gray-300'}
                      `}
                      min="1"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {type === "mensuel" ? "أشهر" : "سنوات"}
                    </div>
                  </div>
                  {errors.duree && (
                    <p className="mt-1 text-sm text-red-600 text-right">{errors.duree}</p>
                  )}
                </div>
                
                {/* معاينة الفترة */}
                {date_debut && duree && (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2 text-right">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      فترة الاشتراك
                    </h4>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-left">
                        <div className="text-gray-600">البداية</div>
                        <div className="font-medium">{formatDate(date_debut)}</div>
                      </div>
                      <svg className="w-5 h-5 text-blue-400 mx-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <div className="text-right">
                        <div className="text-gray-600">النهاية</div>
                        <div className="font-medium">{formatDate(dateFin)}</div>
                      </div>
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className={`
                    w-full mt-6 px-6 py-4 text-white rounded-xl font-medium 
                    shadow-lg hover:shadow-xl transition-all duration-300 
                    flex items-center justify-center gap-3
                    ${isSubmitting
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-200 hover:shadow-blue-300'
                    }
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      جاري الإنشاء...
                    </>
                  ) : (
                    <>
                      تأكيد وإنشاء الاشتراك
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
                </button>
                
                <button 
                  onClick={handleBack}
                  className="w-full px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  الرجوع للتعديل
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}