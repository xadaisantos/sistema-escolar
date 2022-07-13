<?php

namespace App\Http\Controllers;

use App\Aluno;
use Illuminate\Http\Request;
use DateTime;

class AlunoController extends Controller
{
    public function index()
    {
        $alunos = Aluno::get();
        $params = compact('alunos');
        return response()->json($params);
    }

    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $aluno = $request->all();
            $alunoSalvou = Aluno::create([
                'nome' => $aluno['nome'],
                'email' => $aluno['email'],
                'data_de_nascimento' => $aluno['data_de_nascimento'],
                'genero' => $aluno['genero'],
                'telefone' => $aluno['telefone']
            ]);
            if ($alunoSalvou) {
                return response()->json("Aluno salvo com sucesso.", 200);
            } else {
                return response()->json("Ocorreu um problema ao salvar o aluno.", 400);
            }
        } catch (\Exception $ex) {
            $file = $ex->getFile();
            $line = $ex->getLine();
            $message = $ex->getMessage();
            return response()->json("Ocorreu um problema ao salvar o aluno: $file, $line, $message", 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Aluno  $aluno
     * @return \Illuminate\Http\Response
     */
    public function show(Aluno $aluno)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Aluno  $aluno
     * @return \Illuminate\Http\Response
     */
    public function edit(Aluno $aluno)
    {
        return response()->json($aluno, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Aluno  $aluno
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $alunoEditado = $request->except('id', 'created_at', 'query_string');
        $aluno = Aluno::find($request->all()['id']);
        if ( $aluno->update($alunoEditado) ){
            return response()->json("Aluno editado com sucesso.", 200);
        }
        return response()->json("Ocorreu um erro ao editar o aluno.", 400);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Aluno  $aluno
     * @return \Illuminate\Http\Response
     */
    public function destroy(Aluno $aluno)
    {
        try {
            if ( $aluno->delete() ) {
                return response()->json("Aluno excluído com sucesso.", 200);
            }
            return response()->json("Ocorreu um erro ao tentar excluir o aluno.", 400);
        } catch (\Exception $ex) {
            $mensagem = $ex->getMessage();
            return response()->json("Ocorreu um erro ao tentar excluir o aluno: $mensagem", 400);
        }
    }
}
