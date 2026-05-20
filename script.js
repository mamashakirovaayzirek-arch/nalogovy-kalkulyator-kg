let currentActivity = null;

const activities = {
    trade: {
        title: 'Торговая деятельность, осуществляемая',
        sections: [
            {
                title: 'А) Субъектом, за исключением импортёра, экспортёра, дистрибьютора, а также субъекта, реализующего лекарственные средства и медицинские изделия',
                fields: [
                    { num: '050', label: 'До 50 000 000 сомов', rate: 0.5, hasCashNonCash: false, singleRow: true },
                ]
            },
            {
                title: 'Б) Субъектом, не указанных в пункте «А»',
                fields: [
                    { numCash: '053', numRateCash: '054', numTaxCash: '055', label: 'В наличной форме', rate: 4, isCash: true },
                    { numCash: '056', numRateCash: '057', numTaxCash: '058', label: 'В безналичной форме', rate: 2, isCash: true },
                ],
                total: { num: '059', label: 'Итого сумма единого налога (=055+058)' }
            }
        ]
    },
    agro_processing: {
        title: 'Переработка сельскохозяйственной продукции, сферы производства товаров, туроператорской деятельности, разработки программного обеспечения в области вычислительной техники, а также турагентской деятельности',
        sections: [
            {
                title: '',
                fields: [
                    { numCash: '060', numRateCash: '061', numTaxCash: '062', label: 'В наличной форме', rate: 4, isCash: true },
                    { numCash: '063', numRateCash: '064', numTaxCash: '065', label: 'В безналичной форме', rate: 2, isCash: true },
                ],
                total: { num: '066', label: 'Итого сумма единого налога (=062+065)' }
            }
        ]
    },
    other: {
        title: 'Остальные виды деятельности',
        sections: [
            {
                title: '',
                fields: [
                    { numCash: '067', numRateCash: '068', numTaxCash: '069', label: 'В наличной форме', rate: 6, isCash: true },
                    { numCash: '070', numRateCash: '071', numTaxCash: '072', label: 'В безналичной форме', rate: 4, isCash: true },
                ],
                total: { num: '073', label: 'Итого сумма единого налога (=069+072)' }
            }
        ]
    },
    catering_paid: {
        title: 'Общественное питание, оплаченное',
        sections: [
            {
                title: '',
                fields: [
                    { numCash: '074', numRateCash: '075', numTaxCash: '076', label: 'В наличной форме', rate: 4, isCash: true },
                    { numCash: '077', numRateCash: '078', numTaxCash: '079', label: 'В безналичной форме', rate: 2, isCash: true },
                ],
                total: { num: '080', label: 'Итого сумма единого налога (=076+079)' }
            }
        ]
    },
    sewing_textile: {
        title: 'Швейное и/или текстильное производство',
        sections: [
            {
                title: '',
                fields: [
                    { numCash: '081', numRateCash: '082', numTaxCash: '083', label: 'В наличной форме', rate: 2, isCash: true },
                    { numCash: '084', numRateCash: '085', numTaxCash: '086', label: 'В безналичной форме', rate: 1, isCash: true },
                ],
                total: { num: '087', label: 'Итого сумма единого налога (=083+086)' }
            }
        ]
    },
    jewelry: {
        title: 'Производство и/или реализация ювелирных изделий',
        sections: [
            {
                title: '',
                fields: [
                    { numCash: '088', numRateCash: '089', numTaxCash: '090', label: 'В наличной форме', rate: 6, isCash: true },
                    { numCash: '091', numRateCash: '092', numTaxCash: '093', label: 'В безналичной форме', rate: 4, isCash: true },
                ],
                total: { num: '094', label: 'Итого сумма единого налога (=090+093)' }
            }
        ]
    },
    sauna: {
        title: 'Сауна',
        sections: [
            {
                title: '',
                fields: [
                    { numCash: '095', numRateCash: '096', numTaxCash: '097', label: 'В наличной форме', rate: 6, isCash: true },
                    { numCash: '098', numRateCash: '099', numTaxCash: '100', label: 'В безналичной форме', rate: 4, isCash: true },
                ],
                total: { num: '101', label: 'Итого сумма единого налога (=097+100)' }
            }
        ]
    },
    billiard: {
        title: 'Бильярд',
        sections: [
            {
                title: '',
                fields: [
                    { numCash: '102', numRateCash: '103', numTaxCash: '104', label: 'В наличной форме', rate: 6, isCash: true },
                    { numCash: '105', numRateCash: '106', numTaxCash: '107', label: 'В безналичной форме', rate: 4, isCash: true },
                ],
                total: { num: '108', label: 'Итого сумма единого налога (=104+107)' }
            }
        ]
    },
    bath_non_municipal: {
        title: 'Баня, за исключением муниципальных бань',
        sections: [
            {
                title: '',
                fields: [
                    { numCash: '109', numRateCash: '110', numTaxCash: '111', label: 'В наличной форме', rate: 6, isCash: true },
                    { numCash: '112', numRateCash: '113', numTaxCash: '114', label: 'В безналичной форме', rate: 4, isCash: true },
                ],
                total: { num: '115', label: 'Итого сумма единого налога (=111+114)' }
            }
        ]
    }
};

function selectActivity(activityKey) {
    currentActivity = activityKey;
    const activity = activities[activityKey];
    
    document.getElementById('activityTitle').textContent = activity.title;
    
    let html = '';
    
    activity.sections.forEach((section, sIdx) => {
        if (section.title) {
            html += `<div class="section-title">${section.title}</div>`;
        }
        
        section.fields.forEach((field, fIdx) => {
            if (field.singleRow) {
                // Одна строка (торговля, секция А)
                const numRate = String(parseInt(field.num) + 1).padStart(3, '0');
                const numTax = String(parseInt(field.num) + 2).padStart(3, '0');
                html += `
                    <div class="input-row">
                        <div class="label">${field.label}</div>
                        <div class="input-group">
                            <span class="field-num">${field.num}</span>
                            <input type="number" id="revenue_${sIdx}_${fIdx}" placeholder="0" min="0" step="0.01" oninput="calculateSingle(${sIdx}, ${fIdx}, ${field.rate})">
                            <span class="som-sign">сом</span>
                        </div>
                        <div class="input-group">
                            <span class="field-num">${numRate}</span>
                            <input type="number" value="${field.rate}" readonly>
                            <span class="percent-sign">%</span>
                        </div>
                        <div class="input-group">
                            <span class="field-num">${numTax}</span>
                            <input type="number" id="tax_${sIdx}_${fIdx}" readonly placeholder="0">
                            <span class="som-sign">сом</span>
                        </div>
                    </div>
                `;
            } else if (field.isCash) {
                // Наличные / безналичные
                html += `
                    <div class="input-row">
                        <div class="label">${field.label}</div>
                        <div class="input-group">
                            <span class="field-num">${field.numCash}</span>
                            <input type="number" id="revenue_${sIdx}_${fIdx}" placeholder="0" min="0" step="0.01" oninput="calculateCashNonCash(${sIdx})">
                            <span class="som-sign">сом</span>
                        </div>
                        <div class="input-group">
                            <span class="field-num">${field.numRateCash}</span>
                            <input type="number" value="${field.rate}" readonly>
                            <span class="percent-sign">%</span>
                        </div>
                        <div class="input-group">
                            <span class="field-num">${field.numTaxCash}</span>
                            <input type="number" id="tax_${sIdx}_${fIdx}" readonly placeholder="0">
                            <span class="som-sign">сом</span>
                        </div>
                    </div>
                `;
            }
        });
        
        // Итоговая строка
        if (section.total) {
            html += `
                <div class="total-row">
                    <div class="total-label">${section.total.label}</div>
                    <div class="total-value">
                        <span class="field-num">${section.total.num}</span>
                        <input type="number" id="total_${sIdx}" readonly placeholder="0.00" value="0.00">
                        <span class="som-sign">сом</span>
                    </div>
                </div>
            `;
        }
    });
    
    document.getElementById('calculatorContent').innerHTML = html;
    
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
    
    window.scrollTo(0, 0);
}

// Расчёт для одной строки (торговля А)
function calculateSingle(sIdx, fIdx, rate) {
    const revenueInput = document.getElementById(`revenue_${sIdx}_${fIdx}`);
    const taxInput = document.getElementById(`tax_${sIdx}_${fIdx}`);
    
    const revenue = parseFloat(revenueInput.value) || 0;
    const tax = revenue * (rate / 100);
    
    taxInput.value = tax.toFixed(2);
}

// Расчёт для наличные/безналичные
function calculateCashNonCash(sIdx) {
    const activity = activities[currentActivity];
    const section = activity.sections[sIdx];
    let total = 0;
    
    section.fields.forEach((field, fIdx) => {
        const revenueInput = document.getElementById(`revenue_${sIdx}_${fIdx}`);
        const taxInput = document.getElementById(`tax_${sIdx}_${fIdx}`);
        
        const revenue = parseFloat(revenueInput.value) || 0;
        const tax = revenue * (field.rate / 100);
        
        taxInput.value = tax.toFixed(2);
        total += tax;
    });
    
    if (section.total) {
        const totalInput = document.getElementById(`total_${sIdx}`);
        totalInput.value = total.toFixed(2);
    }
}

function goBack() {
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step1').classList.remove('hidden');
    currentActivity = null;
    window.scrollTo(0, 0);
}

function resetAll() {
    const inputs = document.querySelectorAll('input[type="number"]:not([readonly])');
    inputs.forEach(input => {
        if (input.id !== 'year') {
            input.value = '';
        }
    });
    
    const readonlyInputs = document.querySelectorAll('input[readonly]');
    readonlyInputs.forEach(input => {
        input.value = '';
    });
    
    document.getElementById('quarter').value = '1';
}