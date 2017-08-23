# 笔记
[数据结构与算法：图和图算法](https://segmentfault.com/a/1190000010794621?_ea=2419755)

# 参考

[深度优先算法(DFS) js Demo ](http://blog.csdn.net/zwseaman/article/details/7592855)

# 算法
算法实现基本思路为：把所有可能的路径看做一个从根节点出发的树形结构，从出发点开始，依次递归考察每个节点的连通性，直到找到终点或者搜索完整棵树。
```
    function Position(x,y,prePOS){  
        this.X=x;  
        this.Y=y;  
        this.PrePOS = prePOS;  
    }  
    Position.prototype.validate = function(nextPos){  
        //1 在方格范围之内的，2 非障碍物，3 若当前pos的previous pos存在且，next pos不为previous pos  
        if( nextPos.X >=0 && nextPos.X < X && nextPos.Y >=0 && nextPos.Y < Y && grid[nextPos.X][nextPos.Y]==1 && !searchedQ.has(nextPos)){  
            if( this.PrePOS && nextPos.X == this.PrePOS.X && nextPos.Y == this.PrePOS.Y){  
                return false;  
            }  
            return true;  
        }  
        return false;  
    }  
    Position.prototype.Down = function(){  
        var pos = new Position(this.X + 1, this.Y);  
        if(this.validate(pos)){  
            pos.PrePOS = this;  
            return pos;  
        }  
        return undefined;  
    };  
    Position.prototype.Right = function(){  
        var pos = new Position(this.X, this.Y + 1);  
        if(this.validate(pos)){  
            pos.PrePOS = this;  
            return pos;  
        }  
        return undefined;  
    };  
    Position.prototype.Up = function(){  
        var pos = new Position(this.X - 1, this.Y);  
        if(this.validate(pos)){  
            pos.PrePOS = this;  
            return pos;  
        }  
        return undefined;  
    };  
    Position.prototype.Left = function(){  
        var pos =  new Position(this.X, this.Y - 1);  
        if(this.validate(pos)){  
            pos.PrePOS = this;  
            return pos;  
        }  
        return undefined;  
    };  
      
    function Queue(){  
        var me = this;  
        var _list = [];  
        this.length = function(){  
            return _list.length;  
        };  
        this.push=function(position){  
            if(startPos.constructor.name != "Position")  
                throw "Should be Position object.";  
            _list.push(position);  
            return me;  
        }  
        this.fetch=function(){  
            return _list.shift();  
        }  
        this.pop=function(){  
            return _list.pop();  
        }  
        this.has=function(position){  
            for(var i=0,len=_list.length;i<len;i++){  
                if(_list[i].X == position.X && _list[i].Y == position.Y){  
                    return _list[i];  
                }  
            }  
            return undefined;  
        }  
        this.Item = _list;  
    }  
      
    function searchPath(POS){  
        if(!POS){  
            return false;  
        }  
        searchCount++;  
        searchedQ.push(POS);  
        if((POS.X == endPos.X && POS.Y == endPos.Y)){  
            return true;  
        }else{  
            var found = false;  
            var down = POS.Down();  
            var right = POS.Right();  
            var up = POS.Up();  
            var left = POS.Left();  
              
            if(!found && down){  
                found = searchPath(down)  
            }  
            if(!found && right) {  
                found = searchPath(right);  
            }  
            if(!found && up) {  
                found = searchPath(up);  
            }  
            if(!found && left) {  
                found = searchPath(left);  
            }  
            if(!found){  
                grid[POS.X][POS.Y] = -1;  
                return searchPath(POS.PrePOS);  
            }else{  
                return true;  
            }     
        }  
    }  

```
