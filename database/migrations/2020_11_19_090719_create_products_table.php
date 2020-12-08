<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->integer('price')->default(475);
            $table->text('website')->nullable();
            $table->text('city')->nullable();
            $table->text('style_id')->nullable();
            $table->text('name')->nullable();
            $table->text('country')->nullable();
            $table->text('cat_id')->nullable();
            $table->text('brewery_id')->nullable();
            $table->text('descript')->nullable();
            $table->integer('upc')->nullable();
            $table->text('coordinates')->nullable();
            $table->integer('ibu')->nullable();
            $table->text('cat_name')->nullable();
            $table->text('last_mod')->nullable();
            $table->text('state')->nullable();
            $table->text('style_name')->nullable();
            $table->double('abv')->nullable();
            $table->text('address1')->nullable();
            $table->text('name_breweries')->nullable();
            $table->integer('srm')->nullable();
            $table->text('add_user')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
