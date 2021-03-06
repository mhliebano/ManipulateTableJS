/*
 * Class mngTable
 *    by Miguel Hernandez LIebano (2016) @mhliebano - mhliebano@gmail.com - Venezuela
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 *
 * 
 */


var mngTable=function(tb,h){
    var heads=h;
    var table=$("#"+tb);

     try { 
        if(table[0].tagName!="TABLE") throw "Object is not TABLE";
        var rows=table.find("tr").length;
        var cols=table.find("tr:first td").length;
        var fields=new Array();
        if(heads==true){
            $(table).find("tr:eq(0) td").each(function(){
                fields.push($(this).text());
            });
        }
        this.ncols=function(){
            return cols;
        }
        this.nrows=function(){
            return rows;
        }
        this.table=function(){
            return table;
        }
        this.field=function(){
            return fields;
        }
        this.extractDataJSON=function(){
            i=0;
            data='{"'+$(table).attr('id')+'":['
            fields=[];
            $(table).find("tr td").each(function(){
                if(heads==true){
                    if($(this).parent().index()==0){
                        fields.push($(this).text());
                    }else{
                        if(i<=(cols-1)){
                            if(i==0)
                                data+="{";
                            if(i==cols-1){
                                if($(this).parent().index()==(rows-1)){
                                    data+='"'+fields[i]+'":"'+$(this).text()+'"}';
                                }else{
                                    data+='"'+fields[i]+'":"'+$(this).text()+'"},';
                                    i=-1;
                                }
                            }else{
                                data+='"'+fields[i]+'":"'+$(this).text()+'",';
                            }
                        }
                        i++;
                    }
                }else{
                    if(i<=(cols-1)){
                        if(i==0){
                            data+="{";
                        }
                        if(i==cols-1){
                            if($(this).parent().index()==(rows-1)){
                                data+='"field'+i+'":"'+$(this).text()+'"}';
                            }else{
                                data+='"field'+i+'":"'+$(this).text()+'"},';
                                i=-1;
                            }
                        }else{
                            data+='"field'+i+'":"'+$(this).text()+'",';
                        }
                    }
                    i++;
                }
            });
            data+=']}';
            return jQuery.parseJSON(data);
        }
        this.extractDataCELL=function(r,c){
            return table.find("tr").eq(r).find("td").eq(c).text();
        }
        this.extractDataROW=function(r){
            var dt=new Array()
            $(table).find("tr:eq("+r+") td").each(function(){
                dt.push($(this).text());
            });
            return dt;
        }
        this.extractDataCOL=function(c){
            var dt=new Array()
            $(table).find("tr td").each(function(){
                    if($(this).index()==c)
                        dt.push($(this).text());
             });
            return dt;
        }
        this.putDataCELL=function(r,c,text){
            table.find("tr").eq(r).find("td").eq(c).text(text);
        }
        this.putDataROW=function(r,d){
            $(table).find("tr").eq(r).find("td").each(function(){
                $(this).text(d[$(this).index()]);
            });
        }
        this.getIndexCELL=function(ev){
            if(String(ev.currentTarget.id)===String(table.attr('id'))){
                coor=new Array(ev.target.parentNode.rowIndex,ev.target.cellIndex);
                return coor;
            }else{
                throw "OBJECT is NOT TABLE"
            }
        }
        this.getIndexROW=function(e){
            return e.target.parentNode.rowIndex;
        }
        this.getIndexCOL=function(e){
            return e.target.cellIndex;
        }
        this.hideROW=function(r){
            table.find("tr").eq(r).hide();
        }
        this.showROW=function(r){
            table.find("tr").eq(r).show();
        }
        this.hideCOL=function(c){
             $(table).find("tr td").each(function(){
                if($(this).index()==c)
                    $(this).hide();
             });
        }
        this.showCOL=function(c){
             $(table).find("tr td").each(function(){
                if($(this).index()==c)
                    $(this).show();
             });
        }
        this.addROW=function(pos,d){
            rw="<tr>";
            for(i=0;i<cols;i++){
                if(data==undefined){
                    rw+="<td></td>";
                }else{
                    rw+="<td>"+d[i]+"</td>";
                }
            }
            rw+="</tr>";
            if(pos==="last"){
                table.find('tr:last').after(rw);
            }else{
                table.find('tr').eq(pos).after(rw);
            }
            rows+=1;
        }
        this.addCOL=function(pos){
            table.find('tr').each(function () {
                $(this).find('td').eq(pos).after('<td></td>');
            });
            cols+=1
        }
        this.deleteROW=function(r){
            table.find("tr").eq(r).remove();
            rows-=1
        }
        this.deleteCOL=function(c){
            $(table).find("tr td").each(function(){
                if($(this).index()==c){
                    $(this).addClass("remove"+table.attr('id'));
                }
             });
             $(table).find(".remove"+table.attr('id')).each(function(){
                 $(this).remove();
             });
             cols-=1;
        }
        this.findDataCELL=function(t,h){
            if(t==null || t==""){
                table.find("tr").show();
                $(table).find("tr td").removeClass(h)
            }else{
                if(h==undefined){
                    table.find("tr").hide()
                    if(heads==true)
                        table.find("tr:first").show()
                }
                $(table).find("tr td").each(function(){
                    if(h!=undefined)
                        $(this).removeClass(h)
                    if($(this).text().substring(0,t.length).toLowerCase()===t.toLowerCase()){
                        if(h==undefined)
                            $(this).parent().show();
                        else
                            $(this).addClass(h);
                    }
                });
            }
        }
    }
    catch(err) {
        alert("Error: " + err + ".");
    }

    
}
