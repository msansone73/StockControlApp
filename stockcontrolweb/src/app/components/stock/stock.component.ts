import { Component } from '@angular/core';

@Component({
  selector: 'app-stock',
  template: `
    <div class="card">
      <h2>Stock Management</h2>
      <div class="stock-actions mb-4">
        <button class="btn btn-primary">
          <i class="fas fa-plus"></i> Add Product
        </button>
        <button class="btn btn-secondary ms-2">
          <i class="fas fa-file-export"></i> Export Stock
        </button>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sample Product</td>
              <td>SKU123</td>
              <td>Electronics</td>
              <td>100</td>
              <td>$99.99</td>
              <td>
                <span class="badge bg-success">In Stock</span>
              </td>
              <td>
                <button class="btn btn-sm btn-primary me-2">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .stock-actions {
      display: flex;
      gap: 1rem;
    }
    .badge {
      padding: 0.5em 0.75em;
      border-radius: 4px;
      font-size: 0.875em;
    }
    .bg-success {
      background-color: #28a745;
      color: white;
    }
    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }
    .me-2 {
      margin-right: 0.5rem;
    }
  `]
})
export class StockComponent {} 