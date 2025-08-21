import TasksContainer from './components/tasks_components/TasksContainer'
import TimerContainerGem from './components/timer_components/TimerContainerGem'

function App() {
	return (
		<main className="bg-[#ffffff] w-full h-screen flex flex-col items-center gap-6 lg:gap-10 border-t-4 border-orange-500 p-4 sm:p-6 lg:p-8">
			{/* - `max-w-7xl` para limitar a largura da navegação em telas muito grandes, melhorando a legibilidade.
			 */}
			<nav className="w-full flex items-center">
				{/* - Tamanho de fonte responsivo: `text-xl` em telas pequenas e `text-2xl` em telas maiores (sm).
				 */}
				<h1 className="text-gray-700 text-xl sm:text-2xl font-bold">Pomodoro Tasks</h1>
			</nav>

			{/* - Removido `h-[80%]` para que a altura seja determinada pelo conteúdo.
      - `max-w-7xl` também aqui para alinhar com a navegação.
      - `items-center` em telas pequenas e `lg:items-start` para alinhar os cards no topo em telas grandes.
      - Gap responsivo para o conteúdo principal.
    */}
			<section className="w-full lg:h-full flex flex-col lg:flex-row justify-center items-center lg:items-center gap-8 lg:gap-12">
				{/* É crucial que os componentes filhos também sejam responsivos.
        - `w-full`: Ocupa toda a largura disponível no layout de coluna (mobile).
        - `max-w-md`: Limita a largura máxima em telas de celular/tablet para não ficar muito largo.
        - `lg:w-1/2`: Em telas grandes (desktop), cada componente ocupa metade do espaço.
      */}
				<div className="w-full h-full lg:w-[40%] flex justify-center">
					<TimerContainerGem />
				</div>
				<div className="w-full h-full lg:w-[40%] flex justify-center">
					<TasksContainer />
				</div>
			</section>
		</main>
	)
}

export default App
