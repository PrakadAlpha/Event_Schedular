package com.ge.controllers;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ge.bean.Event;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

public class GeneratedPdfReport {

    private static final Logger logger = LoggerFactory.getLogger(GeneratedPdfReport.class);

    public static ByteArrayInputStream eventsReport(List<Event> events) {
    	
    	Document document = new Document();
    	
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        
        try {
        
        PdfPTable table = new PdfPTable(6);
        
        table.setWidthPercentage(100);
        
        table.setWidths(new int[]{5, 5, 5, 4, 5, 5});
        																																																																																																																																																																																																																																																																																																							
        Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

        PdfPCell hcell;
        hcell = new PdfPCell(new Phrase("App Name", headFont));
        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(hcell);
    	
        hcell = new PdfPCell(new Phrase("Environment", headFont));
        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(hcell);
    	
        hcell = new PdfPCell(new Phrase("EventName", headFont));
        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(hcell);
    	
        hcell = new PdfPCell(new Phrase("EventType", headFont));
        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(hcell);
        
        hcell = new PdfPCell(new Phrase("StartDate", headFont));
        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(hcell);
    	
        hcell = new PdfPCell(new Phrase("EndDate", headFont));
        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(hcell);
    	
        for(Event event: events) {
        	
        	PdfPCell cell;
        	
        	cell = new PdfPCell(new Phrase(event.getAppName()));
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            
            cell = new PdfPCell(new Phrase(event.getEnvironment()));
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            
            cell = new PdfPCell(new Phrase(event.getEventName()));
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            
            cell = new PdfPCell(new Phrase(event.getEventType()));
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            
            
            cell = new PdfPCell(new Phrase(event.getStartDate().toString()));
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            
            cell = new PdfPCell(new Phrase(event.getEndDate().toString()));
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            
        }
        
        PdfWriter.getInstance(document, out);
        document.open();
        document.add(table);

        document.close();
        
        }catch (DocumentException e) {
			logger.error("Error Occured : {0}", e);
		}
        return new ByteArrayInputStream(out.toByteArray());
    }
    
}
