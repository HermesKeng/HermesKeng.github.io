> Reference https://stackoverflow.com/questions/39760905/what-is-the-main-difference-between-informed-search-and-uninformed-search-algori

- **Searching**  
    For general purpose, we have two strategies for searching algorithm. 
    One is uninformed search strategies,and the other one is informed search  
    1.Uninformed Search Strategy (Blind Search):
        
        - It means the strategy does't have additional information about states beyond that provided in the problem definition
        - We just generate all successor state for current state and find if it is the goal state among them. If it doesn't, we will generate one of childs node and so on.
        - Searching without information
        - EX. Breadth-first search, Uniform-cost search, Depth-First Search 
       
    2.Informed Search Strategy (Heurisitc):
        
        - It uses problem - specific knowledge beyond the definition of the problem.
        - It can find the solution more efficiently than Uninformed searching 
        - Searching with information
