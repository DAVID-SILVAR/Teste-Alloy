<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Models\Task;
use Carbon\Carbon;

class TaskController extends Controller
{
    public function index()
    {
        return Cache::remember('tasks_all', 60, function () {
            return Task::whereNull('deleted_at')->latest()->get();
        });
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'data_limite' => 'nullable|date_format:Y-m-d'
        ]);

        $task = Task::create($validated);

        Cache::forget('tasks_all');

        return response()->json($task, 201);
    }

    public function show(Task $task)
    {
        return Cache::remember("task_{$task->id}", 60, function () use ($task) {
            return $task;
        });
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'data_limite' => 'nullable|date',
            'finalizado' => 'boolean',
        ]);

        $task->update($validated);

        if ($task->finalizado) {
            DeleteCompletedTask::dispatch($task)->delay(now()->addMinutes(10));
        }

        Cache::forget('tasks_all');
        Cache::forget("task_{$task->id}");

        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();

        Cache::forget('tasks_all');
        Cache::forget("task_{$task->id}");

        return response()->json(null, 204);
    }
}
