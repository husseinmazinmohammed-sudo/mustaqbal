import { jsPDF } from 'jspdf';
import { domToCanvas } from 'modern-screenshot';
import { PocketGuide } from '../types';

export interface GeneratedPdfResult {
  blob: Blob;
  blobUrl: string;
  printableHtmlUrl: string;
  filename: string;
  pageCount: number;
}

/**
 * Generates a standalone, 100% vector, single-page A4 Official University SOP Form HTML document
 * ("فورما رسمية موحدة لجامعة المستقبل") with strict bordered tables and auto-print support.
 */
export function buildUnifiedOfficialPrintHtml(guide: PocketGuide, autoPrint = true): string {
  const takeawaysRows = guide.keyTakeaways
    .map(
      (rule, idx) => `
      <tr>
        <td style="text-align:center; font-family:monospace; font-weight:700; color:#0f766e; width:55px;">0${idx + 1}</td>
        <td style="line-height:1.55;">${rule}</td>
        <td style="text-align:center; width:95px;">
          <span style="background:#ecfdf5; color:#065f46; border:1px solid #a7f3d0; padding:2px 8px; border-radius:4px; font-size:10px; font-weight:600;">إلزامي قياسي</span>
        </td>
      </tr>`
    )
    .join('');

  const specHeaderCells = guide.specTable.headers
    .map((h) => `<th>${h}</th>`)
    .join('');

  const specBodyRows = guide.specTable.rows
    .map(
      (row) => `
      <tr>
        ${row
          .map(
            (cell, cIdx) =>
              `<td style="${
                cIdx === 0
                  ? 'font-weight:600; color:#0f172a;'
                  : cIdx === 1
                  ? 'font-family:monospace; font-weight:700; color:#0f766e;'
                  : 'color:#334155;'
              }">${cell}</td>`
          )
          .join('')}
      </tr>`
    )
    .join('');

  const protocolRows = guide.protocolSteps
    .map(
      (step) => `
      <tr>
        <td style="text-align:center; font-family:monospace; font-weight:700; width:40px;">0${step.stepNumber}</td>
        <td style="font-weight:600; color:#0f172a; width:22%;">${step.title}</td>
        <td style="color:#334155; line-height:1.5;">${step.action}</td>
        <td style="background:#fffbeb; color:#92400e; font-weight:500; width:26%; line-height:1.5;">${step.criticalCheck}</td>
        <td style="text-align:center; width:55px; font-size:14px; color:#0f766e;">☐</td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>الفورما الرسمية الموحدة - ${guide.arabicCode} - جامعة المستقبل</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      margin: 0;
      padding: 0;
      background: #f1f5f9;
      font-family: 'IBM Plex Sans Arabic', Tahoma, Arial, sans-serif;
      color: #1e293b;
      direction: rtl;
    }
    .toolbar-no-print {
      max-width: 210mm;
      margin: 12px auto 0;
      background: #0f766e;
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
    }
    .toolbar-no-print button {
      background: #ffffff;
      color: #0f766e;
      border: none;
      padding: 7px 16px;
      border-radius: 8px;
      font-family: inherit;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
    }
    .a4-sheet {
      width: 210mm;
      min-height: 280mm;
      margin: 12px auto 20px;
      background: #ffffff;
      border: 2px solid #0f766e;
      border-radius: 8px;
      padding: 14px 16px;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
    }
    @media print {
      body {
        background: #ffffff !important;
      }
      .toolbar-no-print {
        display: none !important;
      }
      .a4-sheet {
        width: 100% !important;
        min-height: auto !important;
        margin: 0 !important;
        box-shadow: none !important;
        padding: 10px 12px !important;
      }
    }
    .section-bar {
      background: #0f766e;
      color: #ffffff;
      font-size: 11.5px;
      font-weight: 600;
      padding: 5px 10px;
      border-radius: 5px 5px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }
    table.form-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
    }
    table.form-table th,
    table.form-table td {
      border: 1px solid #94a3b8;
      padding: 5px 8px;
      text-align: right;
      vertical-align: middle;
    }
    table.form-table th {
      background: #f0fdfa;
      color: #134e4a;
      font-weight: 600;
    }
    table.form-table tr:nth-child(even) td {
      background: #f8fafc;
    }
  </style>
</head>
<body>
  <div class="toolbar-no-print">
    <span>الفورما الرسمية الموحدة للطباعة (A4) — جامعة المستقبل · قسم هندسة تقنيات الأجهزة الطبية (${guide.arabicCode})</span>
    <button onclick="window.print()">طباعة الفورما الرسمية الآن (Print / Save as PDF)</button>
  </div>

  <div class="a4-sheet">
    <!-- Top Unified University Header Table -->
    <table class="form-table" style="border: 1.5px solid #0f766e; background: #f4f9f7;">
      <tr>
        <td style="width: 42%; background: #f4f9f7; padding: 8px 10px;">
          <div style="font-size: 10.5px; color: #0f766e; font-weight: 600;">جمهورية العراق · وزارة التعليم العالي والبحث العلمي</div>
          <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 2px;">جامعة المستقبل — الجامعة الأهلية الأولى في العراق</div>
          <div style="font-size: 11.5px; font-weight: 600; color: #115e59; margin-top: 2px;">كلية التقنيات الهندسية · قسم هندسة تقنيات الأجهزة الطبية</div>
        </td>
        <td style="width: 24%; text-align: center; background: #ffffff; padding: 8px;">
          <div style="font-size: 12px; font-weight: 700; color: #0f766e;">استمارة الدليل القياسي الموحد</div>
          <div style="font-size: 9.5px; font-family: monospace; color: #475569; margin-top: 2px;">AL-MUSTAQBAL UNIVERSITY</div>
          <div style="font-size: 9.5px; font-family: monospace; color: #0f766e; font-weight: 600; margin-top: 2px;">STANDARD SOP FORM (A4)</div>
        </td>
        <td style="width: 34%; background: #ffffff; padding: 0;">
          <table style="width: 100%; border-collapse: collapse; font-size: 10.5px;">
            <tr>
              <td style="border: none; border-bottom: 1px solid #cbd5e1; border-left: 1px solid #cbd5e1; background: #f0fdfa; font-weight: 600; padding: 3px 6px; width: 42%;">رمز الوثيقة:</td>
              <td style="border: none; border-bottom: 1px solid #cbd5e1; font-family: monospace; font-weight: 700; padding: 3px 6px;">${guide.arabicCode}</td>
            </tr>
            <tr>
              <td style="border: none; border-bottom: 1px solid #cbd5e1; border-left: 1px solid #cbd5e1; background: #f0fdfa; font-weight: 600; padding: 3px 6px;">تاريخ الإصدار:</td>
              <td style="border: none; border-bottom: 1px solid #cbd5e1; font-family: monospace; padding: 3px 6px;">${guide.updatedDate}</td>
            </tr>
            <tr>
              <td style="border: none; border-left: 1px solid #cbd5e1; background: #f0fdfa; font-weight: 600; padding: 3px 6px;">حالة الاعتماد:</td>
              <td style="border: none; color: #047857; font-weight: 700; padding: 3px 6px;">وثيقة رسمية (صفحة 1/1)</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Section 1: Document Identification -->
    <div class="section-bar">
      <span>القسم الأول: بيانات الوثيقة القياسية والمجال التطبيقي</span>
      <span style="font-family: monospace; font-size: 10px;">SECTION 01 · DOCUMENT IDENTIFICATION</span>
    </div>
    <table class="form-table">
      <tr>
        <td style="background:#f0fdfa; font-weight:600; width:18%;">عنوان الدليل الرسمي:</td>
        <td style="font-weight:700; color:#0f172a; width:42%;">${guide.title}</td>
        <td style="background:#f0fdfa; font-weight:600; width:15%;">المعايير الدولية:</td>
        <td style="font-family:monospace; font-size:10px; color:#0f766e;">${guide.standardsReference.join(' | ')}</td>
      </tr>
      <tr>
        <td style="background:#f0fdfa; font-weight:600;">العنوان القياسي (EN):</td>
        <td colspan="3" style="font-family:monospace; direction:ltr; text-align:left; color:#334155;">${guide.englishTitle}</td>
      </tr>
      <tr>
        <td style="background:#f0fdfa; font-weight:600;">النطاق والهدف السريري:</td>
        <td colspan="3" style="line-height:1.5;">${guide.description}</td>
      </tr>
    </table>

    <!-- Section 2: Mandatory Safety Rules -->
    <div class="section-bar">
      <span>القسم الثاني: المرتكزات والقواعد الإلزامية للسلامة المهنية والسريرية</span>
      <span style="font-family: monospace; font-size: 10px;">SECTION 02 · MANDATORY SAFETY RULES</span>
    </div>
    <table class="form-table">
      <thead>
        <tr>
          <th style="text-align:center; width:55px;">رقم</th>
          <th>القاعدة الإلزامية المعتمدة في المنشأة الصحية</th>
          <th style="text-align:center; width:95px;">درجة الإلزام</th>
        </tr>
      </thead>
      <tbody>
        ${takeawaysRows}
      </tbody>
    </table>

    <!-- Section 3: Technical Spec Table -->
    <div class="section-bar">
      <span>القسم الثالث: ${guide.specTable.title}</span>
      <span style="font-family: monospace; font-size: 10px;">SECTION 03 · STANDARD PARAMETERS</span>
    </div>
    <table class="form-table">
      <thead>
        <tr>${specHeaderCells}</tr>
      </thead>
      <tbody>
        ${specBodyRows}
      </tbody>
    </table>

    <!-- Section 4: Field Execution Protocol Table -->
    <div class="section-bar">
      <span>القسم الرابع: جدول البروتوكول التنفيذي الميداني وقائمة الفحص الحرجة</span>
      <span style="font-family: monospace; font-size: 10px;">SECTION 04 · SOP EXECUTION MATRIX</span>
    </div>
    <table class="form-table">
      <thead>
        <tr>
          <th style="text-align:center; width:40px;">ت</th>
          <th style="width:22%;">المرحلة / الإجراء القياسي</th>
          <th>التوصيف الهندسي والسريري للتنفيذ</th>
          <th style="width:26%;">معيار التدقيق الحرج (القبول)</th>
          <th style="text-align:center; width:55px;">المطابقة</th>
        </tr>
      </thead>
      <tbody>
        ${protocolRows}
      </tbody>
    </table>

    <!-- Section 5: Official Approval & Stamp Table -->
    <table class="form-table" style="margin-top: 10px; border: 1.5px solid #0f766e; background: #f4f9f7;">
      <tr>
        <td style="width: 35%; background: #f4f9f7; vertical-align: top; padding: 8px 10px;">
          <div style="font-weight: 700; color: #0f172a;">إعداد وتدقيق المحتوى الهندسي:</div>
          <div style="color: #334155; margin-top: 2px;">قسم هندسة تقنيات الأجهزة الطبية</div>
          <div style="color: #475569; font-size: 10px;">كلية التقنيات الهندسية — جامعة المستقبل</div>
          <div style="margin-top: 8px; font-size: 10px; color: #0f766e;">التوقيع الهندسي: ____________________</div>
        </td>
        <td style="width: 30%; text-align: center; background: #ffffff; vertical-align: middle; padding: 8px;">
          <div style="border: 1.5px dashed #0f766e; border-radius: 8px; padding: 6px; display: inline-block;">
            <div style="font-weight: 700; color: #0f766e; font-size: 11px;">الختم الرسمي الموحد</div>
            <div style="font-size: 9.5px; color: #334155;">جامعة المستقبل — الجامعة الأهلية الأولى في العراق</div>
            <div style="font-family: monospace; font-size: 9.5px; color: #0f766e; font-weight: 700;">CERTIFIED · ${guide.arabicCode}</div>
          </div>
        </td>
        <td style="width: 35%; background: #f4f9f7; vertical-align: top; padding: 8px 10px;">
          <div style="font-weight: 700; color: #0f172a;">مصادقة الجودة والسلامة المهنية:</div>
          <div style="color: #334155; margin-top: 2px;">وحدة الوقاية الإشعاعية والسلامة السريرية</div>
          <div style="color: #475569; font-size: 10px;">الوثيقة صالحة للتدقيق والاعتماد الميداني</div>
          <div style="margin-top: 8px; font-size: 10px; color: #0f766e;">اعتماد رئاسة القسم: ____________________</div>
        </td>
      </tr>
    </table>
  </div>
  ${
    autoPrint
      ? `<script>
          window.addEventListener('load', function() {
            setTimeout(function() {
              try { window.print(); } catch(e) {}
            }, 350);
          });
        </script>`
      : ''
  }
</body>
</html>`;
}

/**
 * Triggers printing of the unified form via a hidden same-origin iframe.
 */
export function triggerUnifiedIframePrint(guide: PocketGuide) {
  const existing = document.getElementById('amu-unified-print-iframe');
  if (existing) existing.remove();

  const iframe = document.createElement('iframe');
  iframe.id = 'amu-unified-print-iframe';
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.srcdoc = buildUnifiedOfficialPrintHtml(guide, false);

  document.body.appendChild(iframe);

  iframe.onload = () => {
    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch {
        // Fallback handled via PDF blob & printableHtmlUrl
      }
    }, 250);
  };
}

/**
 * Generates an official, single-page A4 PDF file from the Unified Form element
 * AND creates a standalone printable HTML Blob URL.
 */
export async function generateOfficialGuidePdf(
  element: HTMLElement | null,
  guide: PocketGuide
): Promise<GeneratedPdfResult> {
  const filename = `AlMustaqbal_OfficialForm_${guide.arabicCode}.pdf`;

  // Create standalone printable HTML Blob URL (vector 1-page A4 official form)
  const htmlString = buildUnifiedOfficialPrintHtml(guide, true);
  const htmlBlob = new Blob([htmlString], { type: 'text/html;charset=utf-8' });
  const printableHtmlUrl = URL.createObjectURL(htmlBlob);

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  pdf.setProperties({
    title: `${guide.title} - الفورما الرسمية الموحدة - جامعة المستقبل`,
    subject: `الفورما القياسية الموحدة (${guide.arabicCode}) - قسم هندسة تقنيات الأجهزة الطبية`,
    author: 'جامعة المستقبل - كلية التقنيات الهندسية - قسم هندسة تقنيات الأجهزة الطبية',
    creator: 'منصة التوعية بالاستدامة والسلامة المهنية الطبية - جامعة المستقبل'
  });

  if (element) {
    try {
      const sourceCanvas = await domToCanvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        filter: (node) => {
          if (node instanceof HTMLElement && node.classList.contains('no-print')) {
            return false;
          }
          return true;
        }
      });

      const pageWidthMm = 210;
      const pageHeightMm = 297;
      const marginMm = 7;
      const maxWidthMm = pageWidthMm - marginMm * 2;
      const maxHeightMm = pageHeightMm - marginMm * 2;

      const imgW = sourceCanvas.width;
      const imgH = sourceCanvas.height;

      // Fit cleanly onto a single unified A4 page without chopping tables
      let renderW = maxWidthMm;
      let renderH = (imgH * maxWidthMm) / imgW;

      if (renderH > maxHeightMm) {
        renderH = maxHeightMm;
        renderW = (imgW * maxHeightMm) / imgH;
      }

      const xOffset = (pageWidthMm - renderW) / 2;
      const imgData = sourceCanvas.toDataURL('image/png', 1.0);
      pdf.addImage(imgData, 'PNG', xOffset, marginMm, renderW, renderH, undefined, 'FAST');
    } catch (e) {
      console.warn('Canvas capture fallback:', e);
    }
  }

  const blob = pdf.output('blob');
  const blobUrl = URL.createObjectURL(blob);

  return {
    blob,
    blobUrl,
    printableHtmlUrl,
    filename,
    pageCount: 1
  };
}

/**
 * Triggers a direct file download of the generated PDF in the user's browser.
 */
export function downloadGeneratedPdf(blobUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
  }, 200);
}
