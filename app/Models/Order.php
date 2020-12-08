<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use App\Models\Table;
use App\Models\Product;
use App\Models\OrderProduct;

class Order extends Model
{
    protected $fillable = [
        'table_id',
        'employee_id'
    ];

    public function table() {
       return $this->belongsTo(Table::class);
    }

    public function employee() {
       return $this->belongsTo(Employee::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot('product_id', 'order_id', 'quantity');
    }

}
