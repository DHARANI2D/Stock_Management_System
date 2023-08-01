// src/components/TaxReportDocument.js
import React from 'react';
import { PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const TaxReportDocument = ({ taxResult, formData }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: 30,
    },
    header: {
      marginBottom: 20,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    content: {
      fontSize: 12,
    },
  });

  return (
    <PDFViewer>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text>Tax Report for {formData.month}, {formData.year}</Text>
          </View>
          <View style={styles.content}>
            <Text>Taxable Income: ₹ {taxResult.taxableIncome}</Text>
            <Text>Tax Amount: ₹ {taxResult.taxAmount}</Text>
            <Text>Total Credits: ₹ {taxResult.totalCredits}</Text>
            <Text>Net Tax: ₹ {taxResult.netTax}</Text>
            <Text>Paid: {taxResult.isPaid ? 'Yes' : 'No'}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default TaxReportDocument;
