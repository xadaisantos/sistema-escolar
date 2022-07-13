<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlunosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /*
        Deve ter a listagem com busca, cadastro, edição e exclusão de aluno.
        Campos: ID, nome, telefone, e-mail, data de nascimento e gênero.
        Campos obrigatórios: Nome e E-mail.
        Um aluno pode estar ligado a muitas turmas.        
        */
        Schema::create('alunos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nome', 200);
            $table->string('email', 100);
            $table->string('telefone', 15)->nullable();
            $table->date('data_de_nascimento')->nullable();
            $table->string('genero', 50)->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('alunos');
    }
}
