/*Table User - User detail:*/

select add_user_with_details('admin', '123', 'admin', 'Felipe', 'Tavera', 'lftavera@hotmail.com', 'http://google.com');
select add_user_and_detail_id('admin', '123', 'admin');
select update_user_with_detail(1, 'admin', '123', 'admin', 'Felipe', 'Tavera', 'lftavera@hotmail.com', 'http://google.com');
select update_user_without_detail(1, 'admin', '123', 'admin');