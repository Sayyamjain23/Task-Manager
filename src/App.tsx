import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Header';
import AddTask from './components/AddTask';
import FilterTasks from './components/FilterTasks';
import TaskList from './components/TaskList';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Header />
        
        <main className="max-w-3xl mx-auto px-4 pb-16">
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <AddTask />
          </section>
          
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
            <FilterTasks />
            <TaskList />
          </section>
        </main>
      </div>
    </Provider>
  );
}

export default App;