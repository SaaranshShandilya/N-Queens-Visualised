import express from "express";
import cors from "cors";
const app = express();

app.use(express.json())
app.use(cors());


app.get('/', (req, res)=>{
    console.log('running')
})



var solveNQueens = function(n) {
    n=parseInt(n)
    let results = [];
    
    const isValid = (colPlacement) => {
        let rows = colPlacement.length - 1;

        for(let i = 0; i < rows; i++) {
            let diff = Math.abs(colPlacement[i] - colPlacement[rows]); 
            if(diff === 0 || diff === rows - i) {
                return false;
            }
        }
        return true;
    }
    
    const solve = (n, row, colPlacement, results) => {
        if(row === n) {
            results.push([...colPlacement]);
        }
        else {
            for(let col = 0; col < n; col++) {
                colPlacement.push(col);
                
                if(isValid(colPlacement)) {
                     solve(n, row + 1, colPlacement, results);
                }
                colPlacement.pop();
            }
        }
    }
    
    solve(n, 0, [], results);
    results = results.map((result) => {
        return result.map((row, index) => {
            let newRow = '';
            for(let i = 0; i < n; i++) {
                if(i === row) {
                    newRow += 'Q';
                }
                else {
                    newRow += '.';
                }
            }
            return newRow;
        });
    });
    return results;
};



app.post('/', async (req, res) => {
    console.log(req.body.rows)
    return res.json({"board":solveNQueens(req.body.rows)});
})



app.listen(2000, async () => {
    try {
      console.log(`Server running at PORT`);
    } catch (err) {
      console.log(err);
    }
});