<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('login',50)->nullable();
            $table->string('first_name',50)->nullable();
            $table->string('last_name',50)->nullable();
            $table->string('address1',150)->nullable();
            $table->string('address2',100)->nullable();
            $table->string('city',50)->nullable();
            $table->string('state',50)->nullable();
            $table->string('postal_code',20)->nullable();
            $table->string('country',30)->nullable();
            $table->dateTime('terms_and_conditions')->nullable();
            $table->dateTime('last_login_at')->nullable();
            $table->dateTime('last_logout_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $table->dropColumn('login');
        $table->dropColumn('first_name');
        $table->dropColumn('last_name');
        $table->dropColumn('address1');
        $table->dropColumn('address2');
        $table->dropColumn('city');
        $table->dropColumn('state');
        $table->dropColumn('postal_code');
        $table->dropColumn('country');
        $table->dropColumn('terms_and_conditions');
        $table->dropColumn('last_login_at');
        $table->dropColumn('last_logout_at');
    }
}
