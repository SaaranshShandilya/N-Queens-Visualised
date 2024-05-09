import{useState, useEffect} from 'react'
import axios from 'axios';
import queen from '../src/queen.jpeg';
function App() {
  const [board, setBoard] = useState([])
  const [rows, setRows] = useState(0)
  const [boards, setBoards] = useState([])
  const boardPrep = ()=>{
    var single = []
    var br = []
    for(var i=0; i<rows; i++){
      single.push(0)
    }
    for(var i=0; i<rows; i++){
      br.push(single)
    }

    setBoard(br)
  }

  const solve = (col, arr)=>{
    console.log(col);
    if(col == rows){
      setBoard(arr)
      return;
    }
    for(var i=0; i<rows; i++){
      if(isSafe(i, col)){
        arr[i][col] = 1
        // setBoard(arr)
        // board[i][col] = 1
        solve(col+1)
        arr[i][col] = 0
        // setBoard(newArr)
      }
    }
  }

  const isSafe = (row, col)=>{
    var tempRow = row
    var tempCol = col
    while(row>=0 && col>=0){
      if(board[row][col] == 1) return false;
      row--;
      col--;
    }
    row = tempRow
    col = tempCol
    while(col>=0){
      if(board[row][col]==1) return false;
    }
    row = tempRow
    col = tempCol
    while(row<rows && col>=0){
      if(board[row][col] == 1) return false;
      row++;
      col--;
    }
    return true;
  }

  const reqS = ()=>{

    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

console.log(rows)
const raw = JSON.stringify({
  "rows": rows
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:2000/", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    setBoards(result.board)
  })
  .catch((error) => console.error(error));
    // axios.post('http://localhost:2000', {'board':rows})
    // .then((response)=>{
    //   console.log(response)
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })

  }

  console.log(boards)
  
  return (
    <div className="min-h-screen bg-gray-700 p-6">
      <p className="text-white">Enter the number of rows:</p>
      <input value={rows} className="rounded-lg my-2 px-1 py-1" onChange={(e)=>{setRows(e.target.value)}}></input>
      <br></br>
     <div className="flex flex-wrap gap-8">
        {
          boards.map((single)=>{
            return(
              <div className="text-white">
                {
                  single.map((b,j)=>{
                    return(
                      <div className="flex border-black  border-2 shadow-2xl">
                        {
                          b.split('').map((f,i)=>{
                            return(
                              <div className={(i+j)%2==0?"bg-black h-[3rem] w-[3rem] relative":"bg-white h-[3rem] w-[3rem] relative"}>
                                {
                                  f == 'Q' &&
                                  <img src={queen} className="h-10 object-fill -translate-x-1/2 top-1/2 left-1/2 -translate-y-1/2 absolute"></img>
                                }
                              </div>
                            );
                          })
                        }
                      </div>
                    );
                  })
                }
              </div>
            );
          })
        }
      </div> 
      <button className="text-white bg-green-500 rounded-md px-5 py-1 my-2" onClick={()=>{reqS()}}>Solve!</button>
    </div>
  );
}

export default App;
