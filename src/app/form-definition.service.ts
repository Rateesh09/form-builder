import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormDefinitionService {
  // Load form definition
  getFormDefinition() {
    return [
      {
        fieldtype: 'text',
        name: 'Order No',
        group: 'General Information',
        validator: ['required'],
      },
      {
        fieldtype: 'date',
        name: 'OrderedDate',
        group: 'General Information',
        validator: ['required'],
      },
      {
        fieldtype: 'text',
        name: 'OrderedInfo',
        group: 'General Information',
        validator: ['required'],
        condition: 'and',
        rules: [
          {
            field: 'OrderedDate',
            operator: '!=',
            value: '',
          },
        ],
      },
      {
        fieldtype: 'integer',
        name: 'Price',
        group: 'Product Information',
        validator: ['required'],
      },
      {
        fieldtype: 'boolean',
        name: 'Refurbished',
        group: 'Product Information',
        validator: ['required'],
        selectList: ['Yes', 'No'],
      },
      {
        fieldtype: 'text',
        name: 'Address',
        group: 'Product Information',
        validator: ['required'],
        condition: 'or',
        rules: [
          {
            field: 'Order No',
            operator: '>=',
            value: '1',
          },
          {
            field: 'Price',
            operator: '<=',
            value: '500',
          },
        ],
      },
    ];
  }
}
